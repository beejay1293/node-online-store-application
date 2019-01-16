const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

const getProductsFromCart = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if(err){
      return cb([])
    }else{
 cb(JSON.parse(fileContent))



    }
  })
}

module.exports = class Cart {
  static addProduct(id, productPrice){
    fs.readFile(p, (err, fileContent) => {
      let cart = {products: [], totalPrice: 0}
      if(!err){
      cart = JSON.parse(fileContent)
      }

      const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
      const existingProduct = cart.products[existingProductIndex]
      let updatedProduct;
      if(existingProduct) {
      updatedProduct = existingProduct;
      updatedProduct.qty = updatedProduct.qty + 1;
      cart.products = [...cart.products]
      cart.products[existingProductIndex] = updatedProduct;
      }else{
        updatedProduct = { id: id , qty: 1}
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        if(err){
          console.log(err)
        }
      })




    })
  }

   static getProductbyId(id, cb) {
     fs.readFIle(p, (err, fileContent) => {
       let cart = JSON.parse(fileContent)
       if(err){
        cart = []
       }
      const prod = cart.products.find(prod => prod.id === id)
      cb(prod)

     })
   }


  static fetchAll(cb){
  getProductsFromCart(cb)
  }
   static deleteProductFromCart(id, productPrice){
     fs.readFile(p, (err, fileContent) => {
        const file = JSON.parse(fileContent)
      
        if(err){

        }

        const getProducts = file;

       const updatedProduct = getProducts.products.find(p => p.id === id)
       const updatedProductqty = updatedProduct.qty;

       getProducts.products = getProducts.products.filter(p => p.id !== id)

        getProducts.totalPrice = getProducts.totalPrice - productPrice * updatedProductqty;

        fs.writeFile(p, JSON.stringify(getProducts), err => {
          if(err){
            console.log(err)
          }
        })
     })
   }
}
