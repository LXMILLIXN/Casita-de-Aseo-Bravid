var express = require('express');
var router = express.Router();

let mysql = require('mysql');
const { error } = require('selenium-webdriver');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configurar Multer para manejar las subidas de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Crea la carpeta si no existe
    }
    cb(null, uploadDir); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

var connection = mysql.createPool({
  host     : 'localhost',
  database : 'db_tienda_bravid',
  user     : 'root',
  password : ''
  
});

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('insert', { title: 'Casita de Aseo Bravid' });
  });
  

 // Agregar un Nuevo Producto
 router.post('/', upload.single("imagen"), function (req, res) {
  // Obtenemos los datos del cuerpo de la solicitud
  const { nombre, precio, imagen, cantidad, disponibilidad, categoria} = req.body;
  //const imagePath = `/uploads/${req.file.filename}`; 

  // Consulta SQL para insertar datos
  const query = "INSERT INTO productos(nombre, imagen, precio, cantidad, ctr_disponibilidad, id_categoria) values (?, ?, ?, ?, ?, ?)";
    connection.query(query, [nombre, imagen, precio, cantidad, disponibilidad, categoria], (error, results) => {
      if (error) { 
        console.error("Error al insertar datos: ", error);
        return res.status(500).json({ message: "Error interno del servidor" + error});
      }else{
        res.redirect('/dashboard');
        //return res.json({ mensaje : "Producto agregado correctamente!"+ results[0]});
    }
  }); 
}); 
  // Validamos que los datos necesarios estén presentes
  /*
  if (!id && !prod || !id && !price) {
    return res.status(400).json({ message: "Faltan datos necesarios como el ID y nombre o precio" });
  }
    // validamos los datos que recibe del formulario:
    return res.json({ 
    message: "Los datos capturados del formulario son:", 
    nombre : nombre, 
    imagen: imagen,
    precio: precio,
    disponibilidad: disponibilidad,
    categoria:  categoria
  });
  
  
  */

  
  


module.exports = router;