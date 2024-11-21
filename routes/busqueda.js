var express = require('express');
var router = express.Router();
let mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('busqueda', { title: 'Casita de Aseo Bravid' });
});


var connection = mysql.createPool({
  host     : 'localhost',
  database : 'db_tienda_bravid',
  user     : 'root',
  password : ''
  
});

// Buscar un producto
router.post('/', function (req, res) {
 // Obtenemos los datos del cuerpo de la solicitud
 const {search} = req.body;

// Consulta SQL para insertar datos
const query = "select * from productos where nombre like '%" +search+ "%'";
  connection.query(query, (error, results) => {
    if (error) { 
      console.error("Error al insertar datos: ", error);
      return res.status(500).json({ message: "Error interno del servidor" + error});
    }else{
      res.render('dashboard', {results});
  }
}); 
}); 

// Buscar un producto en usuario
router.post('/user', function (req, res) {
  // Obtenemos los datos del cuerpo de la solicitud
  const {search} = req.body;

 // Consulta SQL para insertar datos
 const query = "select * from productos where nombre like '%" +search+ "%'";
   connection.query(query, (error, productos) => {
     if (error) { 
       console.error("Error al insertar datos: ", error);
       return res.status(500).json({ message: "Error interno del servidor" + error});
     }else{
       res.render('index_no', {productos});
   }
 }); 
 }); 


//res.render('dashboard', {results});

module.exports = router;
