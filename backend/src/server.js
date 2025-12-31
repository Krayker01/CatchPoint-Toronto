import express from "express";
import dotenv from "dotenv";
import fishRoutes from "./routes/fishRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

const app = express();
dotenv.config();

// cors
app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

//middleware
app.use(express.json());
app.use(rateLimiter);
app.use("/api/search", fishRoutes);

connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => { console.log("Server was started on port", PORT); });
})
