import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Fish from "../models/Fish.js";
import Location from "../models/Location.js";
import { connectDB } from "../config/db.js";
import fishData from "../data/fishData.js";

// --- helper for bestSeason ---
const createSeason = (mediumMonths = [], highMonths = []) => {
    const months = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];
    const season = {};
    months.forEach(m => {
        if (highMonths.includes(m)) season[m] = { level: "high" };
        else if (mediumMonths.includes(m)) season[m] = { level: "medium" };
        else season[m] = { level: "low" };
    });
    return season;
};

async function seedFish() {
    await connectDB();

    // Удаляем старые рыбы
    await Fish.deleteMany();
    console.log("Old fish removed");

    for (const fish of fishData) {
        // Создаём или обновляем рыбу
        const fishDoc = await Fish.findOneAndUpdate(
            { name: fish.name },
            { $setOnInsert: { ...fish, baits: [] } },
            { upsert: true, new: true }
        );

        // Находим все локации с соответствующим waterType
        const locations = await Location.find({ waterType: { $in: fish.waterType } });
        const locationIds = locations.map(l => l._id);

        // Добавляем рыбу в локации
        await Location.updateMany(
            { _id: { $in: locationIds } },
            { $addToSet: { fish: fishDoc._id } }
        );

        // Добавляем локации в рыбу
        fishDoc.locations = locationIds;
        await fishDoc.save();

        console.log(`${fish.name} linked to ${locationIds.length} locations (${fish.waterType.join(", ")})`);
    }

    console.log("All fish seeded and linked to locations");
    process.exit();
}

seedFish();
