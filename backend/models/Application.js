const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise', required: true },
    franchiseName: { type: String, required: true },
    investorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    investorName: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
