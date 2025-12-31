import express from "express";
import { getFishById, getFishByLocation, getLocationByFish, getAllFish } from "../controllers/fishController.js";
const router = express.Router();

router.get("/fish", getAllFish);
// router.get("/location", getAllLocation);
// router.get("/fish/filter", getFishByFilter);
router.get("/location/:id/fish", getFishByLocation);
router.get("/fish/:id/location", getLocationByFish);
router.get("/fish/:id", getFishById);

export default router;