-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-10-2021 a las 09:14:27
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `airforce`
--
/*CREATE DATABASE IF NOT EXISTS `airforce` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `airforce`;
*/

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `cod` int(5) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` int(9) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `dni` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `num_seguimiento` int(6) NOT NULL,
  `cod_cliente` int(5) NOT NULL,
  `cod_producto` int(5) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentas`
--

CREATE TABLE `cuentas` (
  `ref` varchar(50) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `type` int(2) NOT NULL,
  `cantidad` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `cod` int(5) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `precio` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provee`
--

CREATE TABLE `provee` (
  `num_seguimiento` int(6) NOT NULL,
  `cif_proveedor` varchar(9) NOT NULL,
  `cod_producto` int(5) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `cif` varchar(9) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `telefono` int(9) NOT NULL,
  `email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `ref` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `titular` varchar(25) NOT NULL,
  `cantidad` int(6) NOT NULL,
  `ref_cuenta` varchar(50) NOT NULL,
  `num_seguimiento` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `cod` int(5) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `role` tinyint(1) NOT NULL,
  `cod_cliente` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`cod`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD UNIQUE KEY `num_seguimiento` (`num_seguimiento`),
  ADD KEY `cod_cliente` (`cod_cliente`),
  ADD KEY `cod_pedido` (`cod_producto`);

--
-- Indices de la tabla `cuentas`
--
ALTER TABLE `cuentas`
  ADD PRIMARY KEY (`ref`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`cod`);

--
-- Indices de la tabla `provee`
--
ALTER TABLE `provee`
  ADD UNIQUE KEY `num_seguimiento` (`num_seguimiento`),
  ADD KEY `cif_proveedor` (`cif_proveedor`),
  ADD KEY `cod_producto` (`cod_producto`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`cif`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`ref`),
  ADD UNIQUE KEY `num_seguimiento_2` (`num_seguimiento`),
  ADD KEY `ref_banco` (`ref_cuenta`),
  ADD KEY `num_seguimiento` (`num_seguimiento`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`cod`),
  ADD KEY `cod_cliente` (`cod_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `cod` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `ref` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `cod` int(5) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`cod_cliente`) REFERENCES `clientes` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`cod_producto`) REFERENCES `productos` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `provee`
--
ALTER TABLE `provee`
  ADD CONSTRAINT `provee_ibfk_1` FOREIGN KEY (`cif_proveedor`) REFERENCES `proveedores` (`cif`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `provee_ibfk_2` FOREIGN KEY (`cod_producto`) REFERENCES `productos` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `registro`
--
ALTER TABLE `registro`
  ADD CONSTRAINT `registro_ibfk_1` FOREIGN KEY (`ref_cuenta`) REFERENCES `cuentas` (`ref`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`cod_cliente`) REFERENCES `clientes` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
