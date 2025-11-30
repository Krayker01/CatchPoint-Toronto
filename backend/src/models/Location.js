import mongoose from "mongoose";
const locationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    fish: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fish" }],
    image: { type: String }, // путь к фото места
    coordinates: {          // если планируешь карты
        lat: { type: Number },
        lng: { type: Number }
    }
});

const Location = mongoose.model("Location", fishSchema);
export default Location;