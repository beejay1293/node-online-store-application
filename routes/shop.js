const express = require('express')
const path  = require('path')

const rootDir = require('../utils/path')

const adminData = require('./admin');

const productData = require('../controllers/products.js')

const router = express.Router();

const productController = require('../controllers/products.js');

router.get('/', productController.getProducts)
router.get('/product-list', productController.getProducts)
router.get('/cart', productController.getCart);
router.get('/index', productController.getHomePage)
router.get('/orders', productController.getOrders);
router.get('/product/:productId', productController.getProduct);
router.post('/cart', productController.addProductToCart);
router.post('/delete-cart-item', productController.deleteCartItem)

module.exports = router
