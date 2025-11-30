import express from "express";
import dotenv from "dotenv";
import fishRoutes from "./routes/fishRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();
dotenv.config();

//middleware
app.use("/api/search", fishRoutes);

connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => { console.log("Server was started on port", PORT); });
})
