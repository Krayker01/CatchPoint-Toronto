import mongoose from "mongoose";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

import Location from "../models/Location.js"; // Location
import { connectDB } from "../config/db.js";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

const query = `
[out:json][timeout:600];
(
  relation["natural"="water"]["water"="lake"]["name"](42.9849,-81.6377,45.2533,-78.3199);
  relation["natural"="water"]["water"="pond"]["name"](42.9849,-81.6377,45.2533,-78.3199);
  relation["waterway"="river"]["name"](42.9849,-81.6377,45.2533,-78.3199);
);
out center tags;
`;

const seedLocations = async () => {
    try {
        await connectDB();
        console.log("MONGODB CONNECTED SUCCESSFULLY!");

        // Delete old locations
        await Location.deleteMany();
        console.log("Old locations cleared");

        // Overpass req
        const response = await fetch(OVERPASS_URL, {
            method: "POST",
            body: query,
        });

        const data = await response.json();

        // Map elements to Mongo format
        const locations = data.elements.map((el) => {
            const lat = el.center?.lat;
            const lon = el.center?.lon;

            // Check that the coordinates exist
            if (!lat || !lon) return null;

            // Determining the type of reservoir
            const waterType = el.tags.water || el.tags.waterway || "pond";

            return {
                osmId: el.id,
                name: el.tags.name,
                waterType,
                coordinates: {
                    type: "Point",
                    coordinates: [lon, lat], // GeoJSON: [lng, lat]
                },
                fish: [],
            };
        }).filter(Boolean); // delete null

        // Saving all locations in Mongo
        await Location.insertMany(locations);
        console.log(`✅ Inserted ${locations.length} locations into MongoDB`);

        process.exit();
    } catch (error) {
        console.error("❌ Error seeding locations:", error);
        process.exit(1);
    }
};

seedLocations();
