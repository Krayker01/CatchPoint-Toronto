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

        //  Создаем локации
        const lakeOntario = await Location.create({
            name: "Lake Ontario",
            cityArea: "Toronto Waterfront",
            description: "Большое озеро с множеством рыбы",
            coords: { lat: 43.65, lng: -79.38 },
            image: "lake_ontario.jpg"
        });

        const humberRiver = await Location.create({
            name: "Humber River",
            cityArea: "West Toronto",
            description: "Река с разнообразной рыбой",
            coords: { lat: 43.7, lng: -79.5 },
            image: "humber_river.jpg"
        });

        //  Создаем рыбу
        const pike = await Fish.create({
            name: "Pike",
            bestSeason: { January: "low", July: "high", October: "medium" },
            locations: [lakeOntario._id, humberRiver._id],
            image: "pike.jpg"
        });

        const carp = await Fish.create({
            name: "Carp",
            bestSeason: { May: "high", August: "high" },
            locations: [lakeOntario._id],
            image: "carp.jpg"
        });

        const bass = await Fish.create({
            name: "Bass",
            bestSeason: { June: "high", July: "high" },
            locations: [humberRiver._id],
            image: "bass.jpg"
        });

        //  Создаем приманки
        const spoon = await Bait.create({
            name: "Silver Spoon",
            type: "lure",
            fish: [pike._id]
        });

        const worm = await Bait.create({
            name: "Night Worm",
            type: "live",
            fish: [carp._id, bass._id]
        });

        console.log("✅ Seed data inserted successfully");
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seed();