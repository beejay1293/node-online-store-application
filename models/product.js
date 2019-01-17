//import pool from '../utils/database';

const db = require('../utils/database');
const Cart = require('./cart.js')

module.exports = class Product {
   constructor(id, productName, price, image, description){
   this.Product = productName,
   this.Price = price,
   this.Image = image,
   this.Description = description
   this.id = id
 }

    save(){
     return   db.execute('INSERT INTO store (Product, Price, Description, Image) VALUES (?,?,?,?)', [this.Product, this.Price, this.Description, this.Image]
   )
      }

  static fetchAll(cb){
  db.execute('SELECT * FROM store').then(([rows, fieldData]) => {
    cb(rows)
  }).catch(err => {
    console.log(err);
  });
   }

   static editProduct(id, product, price, image, description) {
     return db.execute("UPDATE store SET Price = ?, Product = ?, Image = ?, Description = ? WHERE id = ?", [price,product,image,description,id])
  }

  static findProduct(id, cb){
    db.execute('SELECT * FROM store WHERE store.id = ?', [id]).then(([product]) => {
     cb(product)
    }).catch((err) => {
      console.log(err);
    })
  }

  static findProductToEdit(id){
    db.execute('SELECT * FROM store WHERE store.id = ?', [id])
  }


   static deleteProduct(id) {
   return db.execute('DELETE FROM store WHERE store.id = ?', [id])
}
}
