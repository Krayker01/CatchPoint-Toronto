import mongoose from "mongoose";
import bestSeasonSchema from "./BestSeason.js";

// Possible values for rarity
const RARITY_ENUM = ["common", "uncommon", "rare"];

// Trophic level / feeding classification
const TROPHIC_LEVEL_ENUM = ["predator", "omnivore", "peaceful"];

// Possible types of water bodies
const WATER_TYPE_ENUM = ["lake", "river", "pond"];

// Possible types of fishing gear
const GEAR_TYPE_ENUM = ["rod", "fly fishing", "trolling"];

const fishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        // Name of the fish
    },
    description: {
        type: String,
        // Description / info about the fish
    },
    image: {
        type: String,
        // URL or path to an image of the fish
    },
    baits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bait" }],
    // List of baits used to catch this fish
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
    // List of locations / water bodies where the fish can be found
    bestSeason: bestSeasonSchema,
    // Best season for catching this fish (month-by-month activity levels)

    // New fields
    rarity: {
        type: String,
        enum: RARITY_ENUM,
        default: "common",
        required: true,
        // Rarity of the fish (common, uncommon, rare)
    },
    trophicLevel: {
        type: String,
        enum: TROPHIC_LEVEL_ENUM,
        required: true,
        // Feeding classification: predator, omnivore, peaceful
    },
    averageWeight: {
        type: Number,
        // Average weight of an adult fish (kg)
    },
    averageSize: {
        type: Number,
        // Average size / length of an adult fish (cm)
    },
    gearType: {
        type: String,
        enum: GEAR_TYPE_ENUM,
        // Recommended fishing gear type
    },
    waterType: [{
        type: String,
        enum: WATER_TYPE_ENUM,
        // Type of water body where the fish lives
    }]
});

const Fish = mongoose.model("Fish", fishSchema);
export default Fish;
