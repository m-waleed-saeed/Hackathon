const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: String, 
    images: [String],
    description: String, 
    category: { type: String, enum: ["health", "education", "disaster", "others"] }, 
    goalAmount: Number, 
    raisedAmount: { type: Number, default: 0 }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    createdAt: Date, 
    status: { type: String, enum: ["active", "closed"], default: "active" },
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;