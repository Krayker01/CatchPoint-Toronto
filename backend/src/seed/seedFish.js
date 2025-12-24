import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Fish from "../models/Fish.js";
import Location from "../models/Location.js";
import { connectDB } from "../config/db.js";
import { fishData } from "../data/fishData.js";

async function seedFish() {
    await connectDB();

    // Remove old fish
    await Fish.deleteMany();
    console.log("Old fish removed");

    for (const fish of fishData) {
        // Create or update fish
        const fishDoc = await Fish.findOneAndUpdate(
            { name: fish.name },
            { $setOnInsert: { ...fish, baits: fish.baits || ["live"] } },
            { upsert: true, new: true }
        );

        // --- Bind baits directly from fishData ---
        fishDoc.baits = fish.baits || ["live"];
        await fishDoc.save();

        // Find all locations with matching waterType
        const locations = await Location.find({ waterType: { $in: fish.waterType } });
        const locationIds = locations.map(l => l._id);

        // Add fish to locations
        await Location.updateMany(
            { _id: { $in: locationIds } },
            { $addToSet: { fish: fishDoc._id } }
        );

        // Add locations to fish
        fishDoc.locations = locationIds;
        await fishDoc.save();

        console.log(`${fish.name} linked to ${locationIds.length} locations and ${fishDoc.baits.length} baits`);
    }

    console.log("All fish seeded with baits and linked to locations");
    process.exit();
}

seedFish();
