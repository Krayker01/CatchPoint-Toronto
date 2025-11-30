import express from "express";
const app = express();
import fishRoutes from "./routes/fishRoutes.js";

//middleware
app.use("/api/search", fishRoutes);

app.listen(3000, () => {
    console.log("Server was strted on port 3000");
});