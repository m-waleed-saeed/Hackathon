const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    mrpPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: { type: [String], required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;