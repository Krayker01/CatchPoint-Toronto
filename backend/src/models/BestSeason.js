import mongoose from "mongoose";

const monthSchema = new mongoose.Schema({
    level: { type: String, enum: ["low", "medium", "high"], default: "low" }
}, { _id: false });

const bestSeasonSchema = new mongoose.Schema({
    january: { ...monthSchema.obj },
    february: { ...monthSchema.obj },
    march: { ...monthSchema.obj },
    april: { ...monthSchema.obj },
    may: { ...monthSchema.obj },
    june: { ...monthSchema.obj },
    july: { ...monthSchema.obj },
    august: { ...monthSchema.obj },
    september: { ...monthSchema.obj },
    october: { ...monthSchema.obj },
    november: { ...monthSchema.obj },
    december: { ...monthSchema.obj },
}, { _id: false });

export default bestSeasonSchema;
