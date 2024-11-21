var express = require('express');
var router = express.Router();
let mysql = require('mysql');

var connection = mysql.createPool({
  host     : 'localhost',
  database : 'db_tienda_bravid',
  user     : 'root',
  password : ''
  
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('carrito', { title: 'Casita de Aseo Bravid' });
});

module.exports = router;