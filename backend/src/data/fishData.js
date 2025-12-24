// Helper for the bestSeason
const createSeason = (mediumMonths = [], highMonths = []) => {
    const months = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];
    const season = {};
    months.forEach(m => {
        if (highMonths.includes(m)) season[m] = { level: "high" };
        else if (mediumMonths.includes(m)) season[m] = { level: "medium" };
        else season[m] = { level: "low" };
    });
    return season;
};
// Data of all fish
export const fishData = [
    {
        name: "Black Crappie",
        image: "public/images/fish/Black_Crappie.png",
        waterType: ["lake", "pond"],
        bestSeason: createSeason(["may", "june"], ["july"]),
        rarity: "common", trophicLevel: "peaceful", averageWeight: 0.5, averageSize: 20, gearType: "rod",
        description: "Small schooling fish. Best caught in warm months near submerged structures."
    },
    {
        name: "Bluegill",
        image: "public/images/fish/Bluegill.png",
        waterType: ["pond", "lake"],
        bestSeason: createSeason(["april", "may"], ["june", "july"]),
        rarity: "common", trophicLevel: "peaceful", averageWeight: 0.3, averageSize: 15, gearType: "rod",
        description: "Popular panfish. Active in spring and early summer near weeds or shallow waters."
    },
    {
        name: "Brown Trout",
        image: "public/images/fish/Brown_Trout.png",
        waterType: ["river", "lake"],
        bestSeason: createSeason(["march", "april"], ["may", "june"]),
        rarity: "uncommon", trophicLevel: "predator", averageWeight: 1.5, averageSize: 50, gearType: "fly fishing",
        description: "Predatory trout. Prefers cooler rivers and streams. Best in spring and early summer."
    },
    {
        name: "Bullhead",
        image: "public/images/fish/Bullhead.png",
        waterType: ["pond", "river"],
        bestSeason: createSeason(["may", "june"], ["july"]),
        rarity: "common", trophicLevel: "omnivore", averageWeight: 0.7, averageSize: 25, gearType: "rod",
        description: "Bottom feeder, active in warm months. Found near mud and vegetation."
    },
    {
        name: "Channel Catfish",
        image: "public/images/fish/Channel_Catfish.png",
        waterType: ["river", "lake"],
        bestSeason: createSeason(["june", "july"], ["august"]),
        rarity: "uncommon", trophicLevel: "omnivore", averageWeight: 4, averageSize: 70, gearType: "rod",
        description: "Popular sport fish. Best caught at dusk in summer using bait on the bottom."
    },
    {
        name: "Common Carp",
        image: "public/images/fish/Common_Carp.png",
        waterType: ["lake", "pond"],
        bestSeason: createSeason(["april", "may"], ["june", "july"]),
        rarity: "common", trophicLevel: "omnivore", averageWeight: 5, averageSize: 80, gearType: "rod",
        description: "Large bottom feeder. Most active in warm months; good in shallow, vegetated areas."
    },
    {
        name: "Freshwater Drum",
        image: "public/images/fish/Freshwater_Drum.png",
        waterType: ["river", "lake"],
        bestSeason: createSeason(["may", "june"], ["july"]),
        rarity: "uncommon", trophicLevel: "omnivore", averageWeight: 2, averageSize: 50, gearType: "rod",
        description: "Mid-sized river/lake species. Active late spring and early summer; bottom fishing recommended."
    },
    {
        name: "Freshwater Sturgeon",
        image: "public/images/fish/Freshwater_Sturgeon.png",
        waterType: ["river"],
        bestSeason: createSeason(["june", "july"], ["august"]),
        rarity: "rare", trophicLevel: "omnivore", averageWeight: 50, averageSize: 200, gearType: "trolling",
        description: "Huge river predator. Active in summer; best for experienced anglers with trolling gear."
    },
    {
        name: "Lake Trout",
        image: "public/images/fish/Lake_Trout.png",
        waterType: ["lake"],
        bestSeason: createSeason(["april", "may"], ["june"]),
        rarity: "uncommon", trophicLevel: "predator", averageWeight: 3, averageSize: 70, gearType: "trolling",
        description: "Deep lake predator. Best in spring and early summer; prefers cold water."
    },
    {
        name: "Lake Whitefish",
        image: "public/images/fish/Lake_Whitefish.png",
        waterType: ["lake"],
        bestSeason: createSeason(["april"], ["may", "june"]),
        rarity: "common", trophicLevel: "peaceful", averageWeight: 1, averageSize: 40, gearType: "rod",
        description: "Small schooling lake fish. Active in spring; good for light tackle fishing."
    },
    {
        name: "Largemouth Bass",
        image: "public/images/fish/Largemouth_Bass.png",
        waterType: ["pond", "lake"],
        bestSeason: createSeason(["may", "june"], ["july"]),
        rarity: "common", trophicLevel: "predator", averageWeight: 2, averageSize: 45, gearType: "rod",
        description: "Popular sport fish. Active late spring/early summer; likes warm, vegetated waters."
    },
    {
        name: "Muskellunge",
        image: "public/images/fish/Muskellunge.png",
        waterType: ["lake", "river"],
        bestSeason: createSeason(["june", "july"], ["august"]),
        rarity: "rare", trophicLevel: "predator", averageWeight: 15, averageSize: 120, gearType: "trolling",
        description: "Large predator. Best in summer; prefers clear lakes or slow rivers."
    },
    {
        name: "Northern Pike",
        image: "public/images/fish/Northern_Pike.png",
        waterType: ["river", "lake"],
        bestSeason: createSeason(["may", "june"], ["july"]),
        rarity: "uncommon", trophicLevel: "predator", averageWeight: 7, averageSize: 80, gearType: "rod",
        description: "Aggressive predator. Active late spring; often near weed beds in lakes and rivers."
    },
    {
        name: "Pumpkinseed",
        image: "public/images/fish/Pumpkinseed.png",
        waterType: ["pond", "lake"],
        bestSeason: createSeason(["april", "may"], ["june"]),
        rarity: "common", trophicLevel: "peaceful", averageWeight: 0.2, averageSize: 12, gearType: "rod",
        description: "Small panfish. Best in spring and early summer; near shallow water and vegetation."
    },
    {
        name: "Rainbow Trout",
        image: "public/images/fish/Rainbow_Trout.png",
        waterType: ["river", "lake"],
        bestSeason: createSeason(["april", "may"], ["june", "july"]),
        rarity: "uncommon", trophicLevel: "predator", averageWeight: 2, averageSize: 50, gearType: "fly fishing",
        description: "Fast river/lake trout. Active in spring/early summer; best with fly fishing in streams."
    },
    {
        name: "Rock Bass",
        image: "public/images/fish/Rock_Bass.png",
        waterType: ["lake"],
        bestSeason: createSeason(["may", "june"], ["july"]),
        rarity: "common", trophicLevel: "predator", averageWeight: 1, averageSize: 25, gearType: "rod",
        description: "Small aggressive lake bass. Best in late spring; near rocks and structure."
    },
    {
        name: "Salmon",
        image: "public/images/fish/Salmon.png",
        waterType: ["river", "lake"],
        bestSeason: createSeason(["june", "july"], ["august"]),
        rarity: "rare", trophicLevel: "predator", averageWeight: 5, averageSize: 90, gearType: "trolling",
        description: "Migratory predator. Best in summer; rivers during runs, lakes for trolling."
    },
    {
        name: "Smallmouth Bass",
        image: "public/images/fish/Smallmouth_Bass.png",
        waterType: ["river", "lake"],
        bestSeason: createSeason(["may", "june"], ["july"]),
        rarity: "common", trophicLevel: "predator", averageWeight: 2, averageSize: 40, gearType: "rod",
        description: "Sport fish. Active late spring; likes clear rivers and rocky lake shores."
    },
    {
        name: "Sucker",
        image: "public/images/fish/Sucker.png",
        waterType: ["river", "pond"],
        bestSeason: createSeason(["april", "may"], ["june"]),
        rarity: "common", trophicLevel: "omnivore", averageWeight: 3, averageSize: 60, gearType: "rod",
        description: "Bottom feeder. Best in spring/early summer; slow rivers and ponds."
    },
    {
        name: "Walleye",
        image: "public/images/fish/Walleye.png",
        waterType: ["lake", "river"],
        bestSeason: createSeason(["may", "june"], ["july"]),
        rarity: "uncommon", trophicLevel: "predator", averageWeight: 4, averageSize: 70, gearType: "rod",
        description: "Nocturnal predator. Best in spring; deep lakes and rivers with structure."
    },
    {
        name: "White Crappie",
        image: "public/images/fish/White_Crappie.png",
        waterType: ["lake", "pond"],
        bestSeason: createSeason(["may", "june"], ["july"]),
        rarity: "common", trophicLevel: "peaceful", averageWeight: 0.6, averageSize: 22, gearType: "rod",
        description: "Similar to Black Crappie. Best in late spring near submerged vegetation."
    },
    {
        name: "White Perch",
        image: "public/images/fish/White_Perch.png",
        waterType: ["river", "lake"],
        bestSeason: createSeason(["may", "june"], ["july"]),
        rarity: "common", trophicLevel: "peaceful", averageWeight: 0.5, averageSize: 20, gearType: "rod",
        description: "Small schooling fish. Best in late spring; lakes and slow rivers."
    },
    {
        name: "Yellow Perch",
        image: "public/images/fish/Yellow_Perch.png",
        waterType: ["lake", "pond"],
        bestSeason: createSeason(["may", "june"], ["july"]),
        rarity: "common", trophicLevel: "peaceful", averageWeight: 0.4, averageSize: 18, gearType: "rod",
        description: "Popular panfish. Best in late spring; shallow areas of lakes and ponds."
    },
];