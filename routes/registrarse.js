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
  res.render('registrarse', { title: 'Casita de Aseo Bravid' });
});

connection.query('SELECT 1', (error) => {
    if (error) {
      console.error("No se pudo conectar a la base de datos: ", error);
    } else {
      console.log("Conexión a la base de datos para modificar productos.");
    }
}); 

  router.post('/', function (req, res) {

    const { nombre, email, password } = req.body;
  
    const query = "insert into USUARIOS (nombres,correo,contraseña, id_rol)values('" +nombre+ "','" +email+ "','" +password+ "',1);" ;
    
    connection.query(query,  (error, results) => {
      if (error) { 
        console.error("Error al insertar datos: ", error);
        return res.status(500).json({ message: "Error interno del servidor"+ error });
      }
      res.render('iniciar_sesion', { title: 'Casita de Aseo Bravid' });
        /*res.status(200).json({
          message: "Usuario agregado exitosamente",
          userId: results.insertId // ID del producto recien actualizado
        });*/
    });
  });

module.exports = router;
