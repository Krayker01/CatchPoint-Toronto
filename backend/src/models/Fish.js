import mongoose from "mongoose";
const fishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    image: { // путь к фото в public/fish/
        type: String
    },
    bestSeason: {
        january: { type: String, default: "low" },
        february: { type: String, default: "low" },
        march: { type: String, default: "low" },
        april: { type: String, default: "low" },
        may: { type: String, default: "low" },
        june: { type: String, default: "low" },
        july: { type: String, default: "low" },
        august: { type: String, default: "low" },
        september: { type: String, default: "low" },
        october: { type: String, default: "low" },
        november: { type: String, default: "low" },
        december: { type: String, default: "low" },
    },
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
    baits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bait" }],
});

const Fish = mongoose.model("Fish", fishSchema);
export default Fish;