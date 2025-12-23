import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    waterType: [{ type: String, enum: ["lake", "pond", "river"], required: true }], //lake, pond, river
    coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true },
    },
    fish: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fish" }]
});

locationSchema.index({ coordinates: "2dsphere" });
const Location = mongoose.model("Location", locationSchema);
export default Location;
