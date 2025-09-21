const express = require('express');
const router = express.Router();
const { createCampaign, getCampaign, updateCampaign, deleteCampaign, getAllCampaigns, getActiveCampaigns } = require('../controller/campaign');
const authMiddleware = require('../middlewares/auth');

// Get All Campaigns
router.get('/', getAllCampaigns);
// Get Active Campaigns
router.get('/status/:status', getActiveCampaigns);
// Create Campaign
router.post('/', authMiddleware, createCampaign);
// Get One Campaign
router.get('/:id', getCampaign);
// Update Campaign
router.put('/:id', updateCampaign);
// Delete Campaign
router.delete('/:id', deleteCampaign);

module.exports = router;