
export function getAllFish(_, res) {
    res.status(200).json({ message: "Fish list retrieved successfully." });
};
export function getFishById(req, res) {
    res.status(200).json({ message: "Fish details by id. " });
};
export function getFishByFilter(req, res) {
    res.status(200).json({ message: "Fish details by filter. " });
};
