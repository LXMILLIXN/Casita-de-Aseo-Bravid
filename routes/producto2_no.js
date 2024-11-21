var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('producto2_no', { title: 'Casita de Aseo Bravid' });
});

module.exports = router;