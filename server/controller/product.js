const Product = require('../models/product')

// Create Product
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const product = await newProduct.save();
        return res.status(201).json({ message: 'User created successfully', product, success: true })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', success: false, error: error.message })
    }
}

// Update Product
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        return res.status(200).json({ message: 'Product updated successfully', product: updatedProduct, success: true })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', success: false, error: error.message })
    }
}

// Get Product
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
        return res.status(200).json({ message: 'Product found successfully', product, success: true })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', success: false, error: error.message })
    }
}

// Get All Products
// const getAllProduct = async (req, res) => {
//     const qNew = req.query.new;
//     const qCategory = req.query.category;
//     const qSearch = req.query.search;
//     let products;

//     if (qSearch) {
//         // Regex search on title and desc
//         products = await Product.find({
//             $or: [
//                 { title: { $regex: qSearch, $options: "i" } },
//                 { desc: { $regex: qSearch, $options: "i" } }
//             ]
//         });
//     } else if (qCategory) {
//         products = await Product.find({ categories: { $in: [qCategory] } });
//     } else if (qNew) {
//         products = await Product.find().sort({ createdAt: -1 });
//     } else {
//         products = await Product.find().sort({ createdAt: -1 });
//     }

//     res.status(200).json(products);
// }

// Delete Product
const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(201).json('Product deleted succesfully')
}

module.exports = { createProduct, deleteProduct, updateProduct, getProduct }