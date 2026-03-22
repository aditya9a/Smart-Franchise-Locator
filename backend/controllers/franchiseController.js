const Franchise = require('../models/Franchise');

const getFranchises = async (req, res) => {
    try {
        const franchises = await Franchise.find();
        res.json(franchises);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getFranchiseById = async (req, res) => {
    try {
        const franchise = await Franchise.findById(req.params.id);
        if (!franchise) return res.status(404).json({ message: "Franchise not found" });
        res.json(franchise);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const addFranchise = async (req, res) => {
    try {
        if (req.user.role !== 'brand') {
            return res.status(403).json({ message: "Only brands can list new franchises" });
        }
        const franchise = new Franchise({
            ...req.body,
            creatorId: req.user.id
        });
        await franchise.save();
        res.status(201).json(franchise);
    } catch (err) {
        console.error("Add Franchise Error:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

module.exports = { getFranchises, getFranchiseById, addFranchise };
