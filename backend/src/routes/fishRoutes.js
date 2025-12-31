import express from "express";
import { getFishByLocation, getLocationByFish, searchFishByName, searchLocationByName } from "../controllers/fishController.js";
const router = express.Router();

router.get("/location/:id/fish", getFishByLocation);
router.get("/fish/:id/location", getLocationByFish);
router.get("/fish", searchFishByName); //autocomplete
router.get("/location", searchLocationByName); //autocomplete
// router.get("/fish", getAllFish);
// router.get("/location", getAllLocation);
// router.get("/fish/filter", getFishByFilter);
// router.get("/fish/:id", getFishById);

export default router;