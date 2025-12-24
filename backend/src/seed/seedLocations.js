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
        console.log("MongoDB connected");

        await Location.deleteMany();
        console.log("Old locations cleared");

        const response = await fetch(OVERPASS_URL, {
            method: "POST",
            body: query,
        });

        const data = await response.json();

        const locations = data.elements.map((el) => {
            const lat = el.center?.lat;
            const lon = el.center?.lon;
            if (!lat || !lon) return null;

            // Water types as an array
            const waterType = [];
            if (el.tags.water === "lake") waterType.push("lake");
            if (el.tags.water === "pond") waterType.push("pond");
            if (el.tags.waterway === "river") waterType.push("river");
            if (waterType.length === 0) waterType.push("pond"); // default

            return {
                name: el.tags.name,
                waterType,
                coordinates: {
                    type: "Point",
                    coordinates: [lon, lat],
                },
                fish: [],
            };
        }).filter(Boolean);

        await Location.insertMany(locations);
        console.log(`Inserted ${locations.length} locations into MongoDB`);

        process.exit();
    } catch (error) {
        console.error("Error seeding locations:", error);
        process.exit(1);
    }
};

seedLocations();
