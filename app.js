
const express = require('express')

const pg = require('pg')

const dotenv = require('dotenv')

const app = express();

const path = require('path')

const db = require('./utils/database');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

const adminData = require('./routes/admin');

const shopRoutes = require('./routes/shop');

const productController = require('./controllers/products.js')

app.set('view engine', 'ejs');
app.set('views', 'views')

db.execute('SELECT * FROM shop').then(([rows, data]) => {
  console.log(rows[0]);
}).catch(err => {
  console.log(err);
})

//const connect = process.env.DATABASE_URL ||  "postgres://mobolaji:December@localhost:3000/bookstore";
dotenv.config();









app.get('/test', (req, res) => {

  console.log(pool);
})

app.get('/', productController.getHomePage);
app.use('/admin', adminData.routes)
app.use('/shop', shopRoutes)


app.use(productController.get404Page);

app.listen(3000);
