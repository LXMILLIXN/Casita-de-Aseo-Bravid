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
  const query = "SELECT * FROM productos order by id_producto desc";
    connection.query(query, (error, results) => {
      if (error) { 
        console.error("Error al insertar datos: ", error);
        return res.status(500).json({ message: "Error interno del servidor" + error});
      }else{
        //const products = Array.isArray(results) ? results : [];
        res.render('dashboard', {results});
        //return res.json({ mensaje : results});
        //console.log(results)
    }
  
  //res.render('dashboard', { title: 'Casita de Aseo Bravid' });
});
});



module.exports = router;