const Franchise = require('../models/Franchise');

const chatWithAI = async (req, res) => {
    try {
        const { message, history } = req.body;
        const query = message.toLowerCase();

        // 1. Extract intent
        let filter = {};
        let responseText = "";

        // Keywords for filtering
        if (query.includes("delhi")) filter.city = "Delhi";
        if (query.includes("mumbai")) filter.city = "Mumbai";
        if (query.includes("bangalore")) filter.city = "Bangalore";

        if (query.includes("food") || query.includes("cafe") || query.includes("restaurant")) {
            filter.category = "Food & Beverage";
        }
        if (query.includes("gym") || query.includes("fitness")) {
            filter.category = "Fitness";
        }
        if (query.includes("clean") || query.includes("service")) {
            filter.category = "Services";
        }

        // Budget extraction (simple regex for numbers)
        const budgetMatch = query.match(/(\d+)\s*(lakh|l)/);
        if (budgetMatch) {
            filter.investment = { $lte: parseInt(budgetMatch[1]) };
        }

        // 2. Fetch data
        const matches = await Franchise.find(filter).limit(3);

        // 3. Generate "AI" response
        if (matches.length > 0) {
            responseText = `Based on your request, I found ${matches.length} great opportunities:\n\n`;
            matches.forEach(m => {
                responseText += `• **${m.name}**: Requires ₹${m.investment}L investment in ${m.city}. (ROI: ${m.roi}%)\n`;
            });
            responseText += `\nWould you like more details on any of these?`;
        } else {
            responseText = "I couldn't find any franchises matching those exact criteria. Would you like to see our most popular listings instead, or try a different city/budget?";
        }

        // Simulating a more conversational tone for generic greetings
        if (query.includes("hello") || query.includes("hi")) {
            responseText = "Hello! I'm your Smart Franchise Advisor. Tell me your budget or target city, and I'll find the best match for you! 🚀";
        }

        res.json({
            reply: responseText,
            matches: matches.map(m => m._id)
        });

    } catch (err) {
        console.error("AI Chat Error:", err);
        res.status(500).json({ message: "AI Advisor is temporarily unavailable." });
    }
};

module.exports = { chatWithAI };
