const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("Server was strted on port 3000");
});

router.get("/search", async (req, res) => {
    const { species, location, month } = req.query;

    let results = {};

    if (species && !location && !month) {
        // Только рыба
        const fish = await Species.findOne({ name: species });
        const spots = await Location.find({ fish: fish._id });
        results = { fish, spots, season: fish.bestSeason };
    }

    else if (month && !species && !location) {
        // Только месяц
        const activeFish = await Species.find({ [`bestSeason.${month}`]: "high" });
        const spots = await Location.find({ fish: { $in: activeFish.map(f => f._id) } });
        results = { activeFish, spots };
    }

    else if (location && !species && !month) {
        // Только локация
        const spot = await Location.findOne({ name: location }).populate("fish");
        results = { spot, fish: spot.fish };
    }

    else {
        // Комбинированные фильтры
        // ...
    }

    res.json(results);
});