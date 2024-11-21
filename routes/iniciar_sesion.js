var express = require('express');
var router = express.Router();
let mysql = require('mysql');
var session = require('express-session'); // Para manejar sesiones

var connection = mysql.createPool({
  host     : 'localhost',
  database : 'db_tienda_bravid',
  user     : 'root',
  password : ''
});

router.use(session({
  secret: 'pablo', // Cambia esto por algo más seguro
  resave: false,
  saveUninitialized: true
}));

/* GET login page */
router.get('/', function(req, res, next) {
  res.render('iniciar_sesion', { title: 'Casita de Aseo Bravid' });
});

router.get('/begin', function(req, res, next) {
  const prods = "SELECT * FROM productos limit 5";
      connection.query(prods, (error, resultProd) => {
          res.render('index_no', { 
            productos: resultProd
          });
        });
});

/* POST login */
router.post('/', function (req, res) {
  const { email, password } = req.body;

  // Consulta para verificar si el correo existe
  const query = "SELECT * FROM USUARIOS WHERE correo = ? and contraseña = ?";
  
  connection.query(query, [email, password], (error, results) => {
    if (error) {
      console.error("Error al consultar usuario: ", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }

    if (results.length === 0) {
      res.redirect('/iniciar_sesion');
      //return res.status(401).json({ message: "Usuario no encontrado" });
    }else{
      const prods = "SELECT * FROM productos limit 5";
      connection.query(prods, (error, resultProd) => {
        if (results[0].id_rol === 2) {
          res.redirect('/dashboard');
        } if (results[0].id_rol === 1)  {
          res.render('index_no', { 
            usuario: results[0].nombres,
            productos: resultProd
          });
        }
      }
    )};
  });
});

module.exports = router;