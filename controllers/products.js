const Product = require('../models/product.js')
const cart = require('../models/cart.js');
exports.getAddProduct =  (req, res) => {
    res.render('admin/add-product', {pageTitle: 'add-product',
  path: '/admin/add-product'})
}

exports.addProductToCart = (req, res) => {
  const prodId = req.body.productId
  Product.findProduct(prodId, product => {
  cart.addProduct(prodId, product.Price)
  })
  res.redirect('/shop/cart');
}

exports.postProduct =  (req, res) =>{
let product = req.body.Product;
let price = req.body.Price;
let image = req.body.Image;
let description = req.body.Description;
  product = new Product(product, price, image, description)
  product.save();
  res.redirect('/admin/products')
}

exports.getProducts = (req, res) => {
  Product.fetchAll(product => { res.render('shop/product-list', {pageTitle: 'Shop', prods: product,
  path: '/shop/product-list'
  })})
}

exports.getCart = (req, res) => {
  cart.fetchAll(cart => {
    Product.fetchAll(products => {
      const cartData = []
      for(product of products){
        const productData = cart.products.find(prod => prod.id === product.id)
        if(productData){
          cartData.push({product : product, qty: productData.qty})
        }
      }
      console.log(cartData)
       res.render('shop/cart', {pageTitle:'Cart', path: '/shop/cart', cart: cartData, totalPrice: cart.totalPrice})
    })
  })



}

exports.getHomePage = (req, res) => {
  res.render('shop/index', {pageTitle: 'Home', path: '/shop/index'  })
}

exports.get404Page = (req, res) => {
  res.status(404).render('404', {pageTitle : 'Page not found', path: '/s'})
}

exports.getOrders = (req, res) => {
  res.render('shop/orders', {pageTitle : 'orders', path: '/shop/orders'});
}

exports.getProduct = (req, res) => {
  const productId = req.params.productId
  Product.findProduct(productId, product => {
    res.render('shop/product-detail', { product: product, pageTitle: 'product details', path: '/product/product-detail'})
  })
}
   exports.deleteCartItem = (req, res) => {
     const prodId = req.body.productId
     console.log(prodId)
     Product.findProduct(prodId, product => {
       const productPrice = product.Price;
       cart.deleteProductFromCart(prodId, productPrice)
       res.redirect('/shop/cart')
     })

   }
