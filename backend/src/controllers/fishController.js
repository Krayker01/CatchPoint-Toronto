import mongoose from "mongoose";
import Fish from "../models/Fish.js";
import Location from "../models/Location.js";

/**
 * Controller: Get all fish
 * Returns all fish with populated locations and baits
 */
export async function getAllFish(_, res) {
    try {
        const fishList = await Fish.find()
            .populate("locations") // just location _id
            .populate("baits");
        return res.status(200).json({ fish: fishList });
    } catch (error) {
        console.error("Error in getAllFish:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// export async function getAllLocation(_, res) {
//     try {
//         const locationList = await Location.find()
//         return res.status(200).json({ location: locationList });
//     } catch (error) {
//         console.error("Error in getAllLocation:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }

/**
 * Controller: Get fish by ID
 * Returns fish with all locations + baits
 */
export async function getFishById(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid fish ID" });
    }

    try {
        const fish = await Fish.findById(id)
            .populate("locations")
            .populate("baits");

        if (!fish) return res.status(404).json({ message: "Fish not found" });

        // Fetch season info for this fish from locations
        const populatedLocations = await Location.find({ "fish.fish": fish._id });

        const locationsWithSeason = populatedLocations.map(loc => {
            const fishEntry = loc.fish.find(f => f.fish.equals(fish._id));
            return {
                _id: loc._id,
                name: loc.name,
                coordinates: loc.coordinates,
                image: loc.image,
                bestSeason: fishEntry?.bestSeason || {}
            };
        });

        return res.status(200).json({
            fish: {
                ...fish.toObject(),
            }
        });
    } catch (error) {
        console.error("Error in getFishById:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * Controller: Get fish by filters
 * Supports:
 *  - species
 *  - location
 *  - month
 */
// export async function getFishByFilter(req, res) {
//     try {
//         const { species, location, month } = req.query;
//         let fishList;

//         // Filter by species only
//         if (species) {
//             fishList = await Fish.find({ name: new RegExp(`^${species}$`, "i") }).populate("baits");
//         } else {
//             fishList = await Fish.find().populate("baits");
//         }

//         // Attach location info and bestSeason
//         const populatedFish = await Promise.all(fishList.map(async f => {
//             // Find all locations for this fish
//             const locs = await Location.find({ "fish.fish": f._id });

//             const locationsWithSeason = locs.map(loc => {
//                 const fishEntry = loc.fish.find(x => x.fish.equals(f._id));
//                 return {
//                     _id: loc._id,
//                     name: loc.name,
//                     coordinates: loc.coordinates,
//                     image: loc.image,
//                     bestSeason: fishEntry?.bestSeason || {}
//                 };
//             });

//             return { ...f.toObject(), locations: locationsWithSeason };
//         }));

//         let filteredFish = populatedFish;

//         // Filter by location
//         if (location) {
//             filteredFish = filteredFish.map(f => {
//                 const locs = f.locations.filter(l => l.name.toLowerCase() === location.toLowerCase());
//                 return { ...f, locations: locs };
//             }).filter(f => f.locations.length > 0);
//         }

//         // Filter by month
//         if (month) {
//             const monthLower = month.toLowerCase();
//             filteredFish = filteredFish.map(f => {
//                 const locs = f.locations.filter(l => ["high", "medium"].includes(l.bestSeason[monthLower]));
//                 if (locs.length === 0) return null;
//                 return { ...f, locations: locs };
//             }).filter(f => f !== null);
//         }

//         return res.status(200).json({ fish: filteredFish });

//     } catch (error) {
//         console.error("Error in getFishByFilter:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }

/**
 * Controller: Get all fish in a location
 */
export async function getFishByLocation(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Location required" });
        const loc = await Location.findById(id).populate("fish");
        if (!loc) return res.status(404).json({ message: "Location not found" });
        const fishes = loc.fish.map(fEntry => fEntry.toObject());
        return res.status(200).json({
            location: { id: loc._id, name: loc.name, coordinates: loc.coordinates },
            fishes
        });

    } catch (error) {
        console.error("Error in getFishByLocation:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getLocationByFish(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Fish required" });
        const fis = await Fish.findById(id)
            .populate({
                path: "locations",
                select: "name waterType coordinates"
            })
            .lean();
        if (!fis) return res.status(404).json({ message: "Fish not found" });
        const locations = fis.locations.map(loc => loc);
        return res.status(200).json({
            fish: { id: fis._id, name: fis.name },
            locations
        });
    } catch (error) {
        console.error("Error in getLocationByFish:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
