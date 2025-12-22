import mongoose from "mongoose";
import bestSeasonSchema from "./BestSeason.js";

const fishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    baits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bait" }],
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
    bestSeason: bestSeasonSchema
});

const Fish = mongoose.model("Fish", fishSchema);
export default Fish;
