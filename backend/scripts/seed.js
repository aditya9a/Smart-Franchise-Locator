const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Franchise = require('../models/Franchise');

dotenv.config();

const franchises = [
    {
        name: "Cafe Aroma",
        brand: "Cafe Aroma Corp",
        category: "Food & Beverage",
        investment: 15,
        land: 500,
        city: "Delhi",
        cities: ["Delhi", "Mumbai", "Bangalore"],
        lat: 28.6139,
        lng: 77.2090,
        description: "A premium coffee brand with over 50 outlets nationwide.",
        roi: 25,
        breakeven: 18,
        royaltyFee: 5,
        established: 2015,
        totalOutlets: 52,
        term: 5
    },
    {
        name: "Burger Hub",
        brand: "Hub Foods Ltd",
        category: "Food & Beverage",
        investment: 25,
        land: 800,
        city: "Mumbai",
        cities: ["Mumbai", "Pune", "Ahmedabad"],
        lat: 19.0760,
        lng: 72.8777,
        description: "Gourmet burgers with a unique local twist.",
        roi: 30,
        breakeven: 14,
        royaltyFee: 7,
        established: 2018,
        totalOutlets: 35,
        term: 7
    },
    {
        name: "Eco-Clean",
        brand: "Eco Services",
        category: "Services",
        investment: 8,
        land: 200,
        city: "Bangalore",
        cities: ["Bangalore", "Hyderabad", "Chennai"],
        lat: 12.9716,
        lng: 77.5946,
        description: "Environmentally friendly cleaning services for homes and offices.",
        roi: 40,
        breakeven: 10,
        royaltyFee: 3,
        established: 2020,
        totalOutlets: 120,
        term: 3
    },
    {
        name: "FitZone Gym",
        brand: "FitZone Wellness",
        category: "Fitness",
        investment: 40,
        land: 2000,
        city: "Pune",
        cities: ["Pune", "Nashik", "Nagpur"],
        lat: 18.5204,
        lng: 73.8567,
        description: "State-of-the-art fitness equipment and personal training programs.",
        roi: 20,
        breakeven: 24,
        royaltyFee: 10,
        established: 2012,
        totalOutlets: 85,
        term: 10
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB for seeding");

        await Franchise.deleteMany({});
        await Franchise.insertMany(franchises);

        console.log("Database Seeded Successfully");
        process.exit();
    } catch (err) {
        console.error("Error seeding database:", err);
        process.exit(1);
    }
};

seedDB();
