const PartnerPool = require('../models/PartnerPool');

const getPools = async (req, res) => {
    try {
        const pools = await PartnerPool.find().populate('franchiseId');
        res.json(pools);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const joinPool = async (req, res) => {
    try {
        const { poolId, amount } = req.body;
        const pool = await PartnerPool.findById(poolId);
        if (!pool) return res.status(404).json({ message: "Pool not found" });

        pool.currentCapital += Number(amount);
        pool.membersCount += 1;
        await pool.save();

        res.json(pool);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const createPool = async (req, res) => {
    try {
        const pool = new PartnerPool(req.body);
        await pool.save();
        res.status(201).json(pool);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getPools, joinPool, createPool };
