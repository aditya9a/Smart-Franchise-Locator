const mongoose = require('mongoose');

const partnerPoolSchema = new mongoose.Schema({
    franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise', required: true },
    franchiseName: { type: String },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    creatorName: { type: String },
    targetCapital: { type: Number, required: true },
    currentCapital: { type: Number, default: 0 },
    membersCount: { type: Number, default: 1 },
    status: { type: String, enum: ['Active', 'Closed'], default: 'Active' },
    city: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PartnerPool', partnerPoolSchema);
