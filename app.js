var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var busquedaRouter = require('./routes/busqueda');
var carritoRouter = require('./routes/carrito');
var caritoRouter = require('./routes/carito');
var iniciar_sesionRouter = require('./routes/iniciar_sesion');
var producto0Router = require('./routes/producto0');
var producto1Router = require('./routes/producto1');
var producto2Router = require('./routes/producto2');
var registrarseRouter = require('./routes/registrarse');
var usuarioRouter = require('./routes/usuario');
var index_noRouter = require('./routes/index_no');
var busqueda_noRouter = require('./routes/busqueda_no');
var producto1_noRouter = require('./routes/producto1_no');
var producto2_noRouter = require('./routes/producto2_no');
var producto3_noRouter = require('./routes/producto3_no');
var dashboardRouter = require('./routes/dashboard');
var insertRouter = require('./routes/insert');
var insertVistaRouter = require('./routes/insert');
var editProd = require('./routes/editprod');
var producto3Router = require('./routes/producto3');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/busqueda', busquedaRouter);
app.use('/carrito', carritoRouter);
app.use('/iniciar_sesion', iniciar_sesionRouter);
app.use('/producto0', producto0Router);
app.use('/producto1', producto1Router);
app.use('/producto2', producto2Router);
app.use('/registrarse', registrarseRouter);
app.use('/usuario', usuarioRouter);
app.use('/_no', index_noRouter);
app.use('/busqueda_no', busqueda_noRouter);
app.use('/producto1_no', producto1_noRouter);
app.use('/producto2_no', producto2_noRouter);
app.use('/producto3_no', producto3_noRouter);
app.use('/dashboard', dashboardRouter);
app.use('/insert', insertRouter);
app.use('/insertProds', insertVistaRouter);
app.use('/editprod', editProd);
app.use('/carito', caritoRouter);
app.use('/producto3', producto3Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
