const express = require("express");
const router = express.Router();
const { donateToCampaign, getMyDonations, getAllDonations } = require("../controller/donor");
const authMiddleware = require("../middlewares/auth");

// Make a Donation
router.post("/", authMiddleware, donateToCampaign);
// Get all donations
router.get("/", authMiddleware, getAllDonations);
// Get my donations
router.get("/my", authMiddleware, getMyDonations);

module.exports = router;
