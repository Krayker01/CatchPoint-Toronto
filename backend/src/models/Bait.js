import mongoose from "mongoose";

const baitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: { type: String }, // например, "воблер", "мормышка", "прикормка"
    description: { type: String },
    fish: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fish" }],
    image: { type: String } // путь к фото в public/baits/
});

const Bait = mongoose.model("Bait", baitSchema);
export default Bait;
