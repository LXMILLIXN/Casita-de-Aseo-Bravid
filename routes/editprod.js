var express = require('express');
var router = express.Router();
let mysql = require('mysql');

var connection = mysql.createPool({
  host     : 'localhost',
  database : 'db_tienda_bravid',
  user     : 'root',
  password : ''
  
});

 connection.query('SELECT 1', (error) => {
      if (error) {
        console.error("No se pudo conectar a la base de datos: ", error);
      } else {
        console.log("Conexión a la base de datos para modificar productos.");
      }
  }); 

  /* GET home page. */
  router.get('/:id', function(req, res, next) {
    const id = req.params.id;

    const query = "select * from productos where id_producto = "+id ;
    connection.query(query, (error, results) => {
      if (error) { 
        console.error("Error al insertar datos: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
      }else{
        res.render('editprod', { 
          id: results[0].id_producto,
          nombre: results[0].nombre,
          precio: results[0].precio,
          cantidad: results[0].cantidad
        });
      }
    });
  });

 

  router.post('/actualizar', function (req, res) {

    const { nombre, precio, cantidad, disponibilidad, categoria, id } = req.body;
    
    const query = "update productos set nombre= ?, precio= ?, cantidad= ?, ctr_disponibilidad= ?, id_categoria= ? where id_producto = ?";
    connection.query(query, [nombre, precio, cantidad, disponibilidad, categoria, id], (error, results) => {
      if (error) { 
        console.error("Error al actualizar el producto: ", error);
        return res.status(500).json({ message: "Error interno del servidor" + error});
      }else{
        res.redirect('/dashboard');
        //return res.json({ mensaje : "Producto agregado correctamente!"+ results[0]});
     }
    }); 
  });

module.exports = router;
