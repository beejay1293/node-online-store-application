const fs = require('fs');
const path= require('path');
  const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const Cart = require('./cart.js')
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if(err){
     return cb([]);
   }else{
    return cb(JSON.parse(fileContent));
   }

  })

}

module.exports = class Product {
   constructor(productName, price, image, description){
   this.Product = productName,
   this.Price = price,
   this.Image = image,
   this.Description = description
   this.id = Math.random().toString()
 }

    save(){
    getProductsFromFile(product => {
      product.push(this)
      fs.writeFile(p, JSON.stringify(product), (err) => {
        console.log(err);
      })











    })

      }

  static fetchAll(cb){
   getProductsFromFile(cb)
   }

   static findProduct(id, cb) {
     getProductsFromFile(products => {
       const product = products.find(p => p.id === id);
      cb(product)
     })

   }

   static editProduct(id, products, price, image, description) {

    getProductsFromFile(product => {
      const productEditIndex = product.findIndex(p => p.id == id)

      let editedProduct = product[productEditIndex];
      if(editedProduct) {

         editedProduct.Product = products;
         editedProduct.Image = image;
         editedProduct.Description = description;
         editedProduct.Price = price;
         product[productEditIndex] = editedProduct;
      }


      fs.writeFile(p, JSON.stringify(product), err => {
        if(err) {

        }
      })

    })
  }

   static deleteProduct(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id)
      if(!product){
        return;
      }
      const productPrice = product.Price;
      const updatedProduct = products.filter(prod => prod.id !== id)
      fs.writeFile(p, JSON.stringify(updatedProduct), err => {
        if(!err){
       Cart.deleteProductFromCart(id, productPrice)
        }
      })

    })

   }
}
