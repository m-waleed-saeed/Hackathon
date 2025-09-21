const express = require("express");
const {  getHeroImages,  deleteHeroImage,  clearHeroImages, createHeroImages } = require("../controller/hero");

const router = express.Router();
// Create
router.post("/create", createHeroImages);
// Read
router.get("/", getHeroImages);          
// Delete one
router.delete("/delete", deleteHeroImage);
// Delete all
router.delete("/clear", clearHeroImages);

module.exports = router;
