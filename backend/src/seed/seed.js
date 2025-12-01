import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import Fish from "../models/Fish.js";
import Location from "../models/Location.js";
import Bait from "../models/Bait.js";

const seed = async () => {
    try {
        await connectDB();

        await Fish.deleteMany();
        await Location.deleteMany();
        await Bait.deleteMany();

        // Create Fish
        const pike = await Fish.create({ name: "Pike", image: "pike.jpg", baits: [], locations: [] });
        const carp = await Fish.create({ name: "Carp", image: "carp.jpg", baits: [], locations: [] });
        const bass = await Fish.create({ name: "Bass", image: "bass.jpg", baits: [], locations: [] });

        // Create Locations with fish + bestSeason
        const lakeOntario = await Location.create({
            name: "Lake Ontario",
            cityArea: "Toronto Waterfront",
            description: "Большое озеро с множеством рыбы",
            coordinates: { lat: 43.65, lng: -79.38 },
            image: "lake_ontario.jpg",
            fish: [
                { fish: pike._id, bestSeason: { july: "high", october: "medium" } },
                { fish: carp._id, bestSeason: { may: "high", august: "high" } }
            ]
        });

        const humberRiver = await Location.create({
            name: "Humber River",
            cityArea: "West Toronto",
            description: "Река с разнообразной рыбой",
            coordinates: { lat: 43.7, lng: -79.5 },
            image: "humber_river.jpg",
            fish: [
                { fish: pike._id, bestSeason: { july: "high", june: "medium" } },
                { fish: bass._id, bestSeason: { june: "high", july: "high" } }
            ]
        });

        // Update Fish with all locations
        await Fish.updateOne({ _id: pike._id }, { $set: { locations: [lakeOntario._id, humberRiver._id] } });
        await Fish.updateOne({ _id: carp._id }, { $set: { locations: [lakeOntario._id] } });
        await Fish.updateOne({ _id: bass._id }, { $set: { locations: [humberRiver._id] } });

        // Create Baits
        const spoon = await Bait.create({
            name: "Silver Spoon",
            type: "lure",
            description: "Металлическая блесна серебристого цвета",
            image: "spoon.jpg",
            fish: [pike._id]
        });

        const worm = await Bait.create({
            name: "Night Worm",
            type: "live",
            description: "Натуральный червь для рыбалки",
            image: "worm.jpg",
            fish: [carp._id, bass._id]
        });

        // Update Fish with bait references
        await Fish.updateOne({ _id: pike._id }, { $push: { baits: spoon._id } });
        await Fish.updateOne({ _id: carp._id }, { $push: { baits: worm._id } });
        await Fish.updateOne({ _id: bass._id }, { $push: { baits: worm._id } });

        console.log("✅ Seed data inserted successfully");
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seed();
