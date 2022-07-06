const express = require('express');

const controller = require('../Controller/productController')

const router = express.Router();
const multer=require('multer');
const upload=multer({dest:'uploads'})

// Create Operation

router.post('/addProduct', controller.createProduct)
router.post('/updateProduct/:id', controller.updateProduct)

// Read Operation
router.get('/viewAllProducts', controller.viewALlProducts);

// Update Operation


// Delete Operation
router.get('/deleteProduct/:id', controller.deleteProduct);

module.exports = router;