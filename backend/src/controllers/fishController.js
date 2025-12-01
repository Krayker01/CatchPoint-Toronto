import mongoose from "mongoose";
import Fish from "../models/Fish.js";
import Location from "../models/Location.js";
import Bait from "../models/Bait.js";

// AllFish controller
export async function getAllFish(_, res) {
    try {
        const fish = await Fish.find().populate("locations").populate("baits");
        res.status(200).json({ fish });
    } catch (error) {
        console.error("Error in getAllFish controller", error);
        res.status(500).json({ message: "Internal server error" })
    }
};

// FishById controller
export async function getFishById(req, res) {
    const { id } = req.params;
    // Validation of ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid fish ID" });
    }
    try {
        const fish = await Fish.findById(id)
            .populate("locations")
            .populate("baits");
        if (!fish) return res.status(404).json({ message: "Fish not found" });
        res.status(200).json({ fish });
    } catch (error) {
        console.error("Error in getFishById controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// FishByFilter controller
export async function getFishByFilter(req, res) {
    try {
        const { species, location, month } = req.query;
        let fishIds = [];
        let locationIds = [];

        // If a fish is specified
        if (species) {
            const fish = await Fish.findOne({ name: species })
            if (!fish) return res.status(404).json({ message: "No such fish" });
            fishIds = [fish._id]
        }

        // If a month is specified
        if (month) {
            const seasonal = await Fish.find({ [`bestSeason.${month}`]: "high" });
            const seasonalIds = seasonal.map(f => f._id);
            fishIds = fishIds.length ? fishIds.filter(id => seasonalIds.includes(id)) : seasonalIds
        }

        // If a location is specified
        if (location) {
            const loc = await Location.findOne({ name: location });
            if (!loc) return res.status(404).json({ message: "Location not found" });
            locationIds = [loc._id];
            fishIds = fishIds.length
                ? await Fish.find({ _id: { $in: fishIds }, locations: loc._id }).distinct("_id")
                : await Fish.find({ locations: loc._id }).distinct("_id");
        }

        // If nothing is specified → return all
        if (!species && !location && !month) {
            const fish = await Fish.find().populate("locations");
            return res.status(200).json({ fish });
        }

        const fish = await Fish.find({ _id: { $in: fishIds } })
            .populate("locations")
            .populate("baits");

        res.status(200).json({ fish });
    } catch (error) {
        console.error("Error in getFishByFilter controller");
        res.status(500).json({ message: "Internal server error" });
    }
};
