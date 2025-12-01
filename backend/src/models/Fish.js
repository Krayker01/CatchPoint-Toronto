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
    image: {
        type: String
    },
    baits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bait" }],
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }]
});

const Fish = mongoose.model("Fish", fishSchema);
export default Fish;
