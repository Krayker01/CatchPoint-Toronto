import express from "express";
import { getAllFish, getAllLocation, getFishByFilter, getFishById } from "../controllers/fishController.js";
const router = express.Router();

router.get("/fish", getAllFish);
router.get("/location", getAllLocation);
router.get("/fish/filter", getFishByFilter);
router.get("/fish/:id", getFishById);

export default router;