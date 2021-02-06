-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-02-2021 a las 14:44:27
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tasks`
--
CREATE DATABASE IF NOT EXISTS `tasks` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tasks`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `list_tasks`
--

DROP TABLE IF EXISTS `list_tasks`;
CREATE TABLE `list_tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(60) NOT NULL,
  `description` text NOT NULL,
  `date` date DEFAULT current_timestamp(),
  `completed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indices de la tabla `list_tasks`
--
ALTER TABLE `list_tasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
