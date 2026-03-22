const Application = require('../models/Application');

const getApplications = async (req, res) => {
    try {
        // If investor is logged in, show only their applications.
        // For now, let's just show all or filter by query.
        const filter = req.query.investorId ? { investorId: req.query.investorId } : {};
        const applications = await Application.find(filter).populate('franchiseId');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const createApplication = async (req, res) => {
    try {
        const application = new Application(req.body);
        await application.save();
        res.status(201).json(application);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
        res.json(application);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getApplications, createApplication, updateApplicationStatus };
