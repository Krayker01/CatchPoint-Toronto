import express from "express";
import { getAllFish, getFishByFilter, getFishById } from "../controllers/fishController.js";
const router = express.Router();

router.get("/", getAllFish);
router.get("/filter", getFishByFilter);
router.get("/:id", getFishById);

export default router;