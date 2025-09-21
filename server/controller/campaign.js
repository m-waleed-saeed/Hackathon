const Campaign = require('../models/campaign');

// Create Campaign
const createCampaign = async (req, res) => {
    try {     
      const { title, description, category, goalAmount, images } = req.body;
  
      if (!title || !description || !category || !goalAmount) {
        return res.status(400).json({ success: false, message: "Please fill all required fields" });
      }
  
      const createdBy = req.user._id; 
      const newCampaign = new Campaign({
        title,
        description,
        category,
        goalAmount,
        images,
        createdBy,
        createdAt: new Date()
      });
  
      await newCampaign.save();
      res.status(201).json({ success: true, message: "Campaign created successfully!", data: newCampaign });
    } catch (error) {
      console.error("Create campaign error:", error.message);
      res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
  };
  
// Get One Campaign
const getCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const campaign = await Campaign.findById(id);
        res.status(200).json({ success: true, message: "Campaign fetched successfully!", data: campaign });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

//Update Campaign
const updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, goalAmount, createdBy, images } = req.body;
        const campaign = await Campaign.findByIdAndUpdate(id, { title, description, category, goalAmount, createdBy, images }, { new: true });
        res.status(200).json({ success: true, message: "Campaign updated successfully!", data: campaign });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

//Delete Campaign
const deleteCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        await Campaign.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Campaign deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

//Get All Campaigns
const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json({ success: true, message: "Campaigns fetched successfully!", data: campaigns });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

//Get Active Campaigns
const getActiveCampaigns = async (req, res) => {
    try {
        const { status } = req.params;
        const campaigns = await Campaign.find({
            status: status,
        });
        res.status(200).json({ success: true, message: "Active campaigns fetched!", data: campaigns });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }

};



module.exports = { createCampaign, getCampaign, updateCampaign, deleteCampaign, getAllCampaigns, getActiveCampaigns };