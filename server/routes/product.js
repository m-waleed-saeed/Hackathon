const express = require('express')
const router = express.Router()
const { createProduct, deleteProduct, updateProduct, getProduct, getAllProduct, ratingProduct } = require('../controller/product')

// Create Product 
router.post('/', createProduct)

// Get One Product 
router.get('/find/:id', getProduct)

// Get All Product 
// router.get('/', getAllProduct)

// Update Product 
router.put('/:id', updateProduct)

// Delete Product 
router.delete('/:id', deleteProduct)

module.exports = router