const Donation = require("../models/donation");
const Campaign = require("../models/campaign");

// Make a Donation
const donateToCampaign = async (req, res) => {
    try {
        const { campaignId, amount } = req.body;
        const donorId = req.user._id;

        if (!campaignId || !amount) {
            return res.status(400).json({ success: false, message: "Campaign ID and amount are required" });
        }

        const newDonation = new Donation({ donorId, campaignId, amount });
        await newDonation.save();

        await Campaign.findByIdAndUpdate(campaignId, { $inc: { raisedAmount: amount } });

        res.status(201).json({ success: true, message: "Donation successful!", data: newDonation });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Get all donations
const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find().populate("campaignId");
        res.status(200).json({ success: true, data: donations });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

// Get my donations
const getMyDonations = async (req, res) => {
    try {
        const donorId = req.user._id;
        const donations = await Donation.find({ donorId }).populate("campaignId");
        res.status(200).json({ success: true, data: donations });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

module.exports = { donateToCampaign, getMyDonations, getAllDonations };
