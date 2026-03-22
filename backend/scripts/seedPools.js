const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Franchise = require('../models/Franchise');
const User = require('../models/User');
const PartnerPool = require('../models/PartnerPool');

dotenv.config();

const seedPools = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB for pool seeding");

        const franchises = await Franchise.find();
        let user = await User.findOne({ email: 'partner@example.com' });

        if (!user) {
            user = new User({
                name: "Admin Leader",
                email: "partner@example.com",
                password: "password123",
                role: "investor",
                city: "Delhi"
            });
            await user.save();
        }

        const pools = [
            {
                franchiseId: franchises[0]._id,
                franchiseName: franchises[0].name,
                creatorId: user._id,
                creatorName: user.name,
                targetCapital: 15,
                currentCapital: 5,
                membersCount: 2,
                city: "Delhi",
                status: "Active"
            },
            {
                franchiseId: franchises[1]._id,
                franchiseName: franchises[1].name,
                creatorId: user._id,
                creatorName: user.name,
                targetCapital: 25,
                currentCapital: 12,
                membersCount: 3,
                city: "Mumbai",
                status: "Active"
            }
        ];

        await PartnerPool.deleteMany({});
        await PartnerPool.insertMany(pools);

        console.log("Pools Seeded Successfully");
        process.exit();
    } catch (err) {
        console.error("Error seeding pools:", err);
        process.exit(1);
    }
};

seedPools();
