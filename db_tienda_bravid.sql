-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 13-11-2024 a las 04:42:04
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_tienda_bravid`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

DROP TABLE IF EXISTS `carrito`;
CREATE TABLE IF NOT EXISTS `carrito` (
  `id_carrito` int NOT NULL AUTO_INCREMENT,
  `id_producto` int DEFAULT NULL,
  `fecha_creacion` date NOT NULL,
  `cantidad_prod` int NOT NULL,
  `precio` float NOT NULL,
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id_carrito`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE IF NOT EXISTS `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(30) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

DROP TABLE IF EXISTS `factura`;
CREATE TABLE IF NOT EXISTS `factura` (
  `id_factura` int NOT NULL AUTO_INCREMENT,
  `fec_compra` date NOT NULL,
  `id_orden` int DEFAULT NULL,
  PRIMARY KEY (`id_factura`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

DROP TABLE IF EXISTS `inventario`;
CREATE TABLE IF NOT EXISTS `inventario` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `descripcion` varchar(60) DEFAULT NULL,
  `precio` float NOT NULL,
  `ctr_disponibilidad` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodos_pago`
--

DROP TABLE IF EXISTS `metodos_pago`;
CREATE TABLE IF NOT EXISTS `metodos_pago` (
  `id_metodo_pago` int NOT NULL,
  `metodo_pago` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_metodo_pago`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `metodos_pago`
--

INSERT INTO `metodos_pago` (`id_metodo_pago`, `metodo_pago`) VALUES
(1, 'TARJETA CREDITO'),
(2, 'TARJETA DEBITO'),
(3, 'EFECTIVO'),
(4, 'TRANSFIYA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

DROP TABLE IF EXISTS `orden`;
CREATE TABLE IF NOT EXISTS `orden` (
  `id_orden` int NOT NULL AUTO_INCREMENT,
  `fecha_orden` date NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_carrito` int DEFAULT NULL,
  `estado` int NOT NULL,
  `id_metodo_pago` int DEFAULT NULL,
  PRIMARY KEY (`id_orden`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `imagen` blob,
  `precio` float NOT NULL,
  `ctr_disponibilidad` int NOT NULL,
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `imagen`, `precio`, `ctr_disponibilidad`, `id_categoria`) VALUES
(1, 'JABON DOVE X120GR.', NULL, 6500, 1, 2),
(2, 'CREMA COLGATE TRIPLE ACCION', NULL, 9700, 1, 2),
(3, 'TRAPERO FULLFRESH', NULL, 4000, 1, 3),
(4, 'FABULOSO X800ML', NULL, 6700, 1, 3),
(5, 'NUTRIBELA ANTI FRIZZ 400 ML', NULL, 24500, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `ID_ROL` int NOT NULL AUTO_INCREMENT,
  `ROL` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID_ROL`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`ID_ROL`, `ROL`) VALUES
(1, 'CLIENTE'),
(2, 'ADMINISTRADOR'),
(3, 'MANTENIMIENTO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(30) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `contraseña` varchar(30) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `id_rol` int NOT NULL,
  `ciudad` varchar(30) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_id_rol` (`id_rol`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombres`, `apellidos`, `correo`, `contraseña`, `direccion`, `id_rol`, `ciudad`, `fecha_nacimiento`) VALUES
(1, 'BRAYAN', 'TORRES VEGA', 'BRYANTO2927@GMAIL.COM', 'PRUEBA123', 'CRA 5D #33 - 27', 1, 'BOGOTÁ', '2006-02-10'),
(2, 'DANIEL DAVID', 'RODRIGUEZ GONZALES', 'DANY.P22@GMAIL.COM', 'PRUEBA456', 'CLL 26 #33 - 8', 1, 'BOGOTÁ', '1996-08-10'),
(3, 'DANIELA SOFIA', 'GARCIA RUIZ', 'PRERF.FACE28@GMAIL.COM', 'PRUEWQE321', 'AV 68 NO. 27-73', 2, 'MEDELLIN', '1995-11-10');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
