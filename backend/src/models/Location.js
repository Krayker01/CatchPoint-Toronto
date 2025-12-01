import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    coordinates: {
        lat: { type: Number },
        lng: { type: Number }
    },
    fish: [
        {
            fish: { type: mongoose.Schema.Types.ObjectId, ref: "Fish", required: true },
            bestSeason: {
                january: { type: String, enum: ["low", "medium", "high"], default: "low" },
                february: { type: String, enum: ["low", "medium", "high"], default: "low" },
                march: { type: String, enum: ["low", "medium", "high"], default: "low" },
                april: { type: String, enum: ["low", "medium", "high"], default: "low" },
                may: { type: String, enum: ["low", "medium", "high"], default: "low" },
                june: { type: String, enum: ["low", "medium", "high"], default: "low" },
                july: { type: String, enum: ["low", "medium", "high"], default: "low" },
                august: { type: String, enum: ["low", "medium", "high"], default: "low" },
                september: { type: String, enum: ["low", "medium", "high"], default: "low" },
                october: { type: String, enum: ["low", "medium", "high"], default: "low" },
                november: { type: String, enum: ["low", "medium", "high"], default: "low" },
                december: { type: String, enum: ["low", "medium", "high"], default: "low" },
            }
        }
    ]
});

const Location = mongoose.model("Location", locationSchema);
export default Location;
