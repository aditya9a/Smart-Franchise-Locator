const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { name, email, password, role, city, capital, landArea } = req.body;

        console.log("Registration attempt for:", email);

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            console.log("User already exists:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        const roleLower = role ? role.toLowerCase() : 'investor';
        user = new User({ name, email, password, role: roleLower, city, capital: Number(capital) || 0, landArea: Number(landArea) || 0 });
        await user.save();

        console.log("User saved successfully:", email);

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
    } catch (err) {
        console.error("Registration Error Details:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for:", email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found:", email);
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch for:", email);
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
    } catch (err) {
        console.error("Login Error Details:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, city, capital, landArea } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = name || user.name;
        user.city = city || user.city;
        user.capital = capital || user.capital;
        user.landArea = landArea || user.landArea;

        await user.save();
        res.json({ token: req.header('Authorization').split(' ')[1], user: { id: user._id, name: user.name, email: user.email, role: user.role, city: user.city, capital: user.capital, landArea: user.landArea } });
    } catch (err) {
        console.error("Profile Update Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { register, login, updateProfile };
