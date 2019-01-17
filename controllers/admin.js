const Product = require('../models/product.js');
exports.getAdminProducts = (req, res) => {
  Product.fetchAll(product => { res.render('admin/products', {pageTitle: 'Admin Products', prods: product,
  path: '/admin/products'
  })})
}

exports.getEditProduct = (req, res) => {
  prodId = req.params.productId
  Product.findProduct(prodId, ([product]) => {
    // COMBAK:
    res.render('admin/edit-product', {pageTitle: 'Edit-product', prods: product, path: '/admin/add-product'})
  })
}

exports.editProducts = (req, res) => {
  prodId = req.body.productId;
  product = req.body.productName
  productPrice = req.body.Price;
  productDescription = req.body.Description;
  productImage = req.body.Image;


  Product.editProduct(prodId,product,productPrice,productImage,productDescription).then(() => {
      res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
  })

}

exports.deleteProduct = (req, res) => {
  prodId = req.body.productId;
    Product.deleteProduct(prodId).then(() => {
   res.redirect('/admin/products')
    }).catch(err => {
      console.log(err);
    })

}
