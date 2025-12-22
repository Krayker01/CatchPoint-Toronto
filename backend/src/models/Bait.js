import mongoose from "mongoose";

const baitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: { type: String }, // for example, "wobbler", "spinner", "bait"
    description: { type: String },
    image: { type: String } // path to photo in public/baits/
});

const Bait = mongoose.model("Bait", baitSchema);
export default Bait;
