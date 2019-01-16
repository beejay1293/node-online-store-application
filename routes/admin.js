const express = require('express')

const path = require('path')

const rootDir = require('../utils/path');
const router = express.Router();

const productsController = require('../controllers/products.js')

const adminController = require('../controllers/admin.js')

const product = [];



router.get('/add-product', productsController.getAddProduct);
router.get('/products', adminController.getAdminProducts)
router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/products', productsController.postProduct);
router.post('/editProducts', adminController.editProducts)
router.post('/delete-product', adminController.deleteProduct);
exports.routes = router;
exports.product = product
