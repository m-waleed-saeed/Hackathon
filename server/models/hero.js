const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  images: {
    type: [String], 
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Hero", heroSchema);
