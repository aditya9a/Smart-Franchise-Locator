const mongoose = require('mongoose');

const franchiseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    investment: { type: Number, required: true },
    land: { type: Number, required: true },
    city: { type: String },
    cities: [{ type: String }],
    lat: { type: Number },
    lng: { type: Number },
    description: { type: String },
    roi: { type: Number },
    breakeven: { type: Number },
    royaltyFee: { type: Number },
    established: { type: Number },
    totalOutlets: { type: Number },
    term: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Franchise', franchiseSchema);
