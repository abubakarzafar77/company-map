-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2017 at 09:41 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `map`
--

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `company_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_lat` varchar(255) NOT NULL,
  `company_lng` varchar(255) NOT NULL,
  `company_country` varchar(255) NOT NULL,
  `company_province` varchar(255) NOT NULL,
  `company_district` varchar(255) NOT NULL,
  `company_city` varchar(255) NOT NULL,
  `company_vicinity` varchar(255) NOT NULL,
  `company_roadAndStreet` varchar(255) NOT NULL,
  `company_postalCode` varchar(255) NOT NULL,
  `company_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`company_id`, `company_name`, `company_lat`, `company_lng`, `company_country`, `company_province`, `company_district`, `company_city`, `company_vicinity`, `company_roadAndStreet`, `company_postalCode`, `company_image`) VALUES
(1, 'purelogics', '31.512594000000004', '74.34114', 'Pakistan', 'Punjab', 'Lahore District', 'Lahore', 'Samanabad', 'Sikandar Ali Malhi Road', '54000', ''),
(2, 'netSole', '31.516691588809465', '74.3246605078125', 'Pakistan', 'Punjab', 'Lahore District', 'Lahore', 'Samanabad', 'Sikandar Ali Malhi Road', '54000', ''),
(19, 'Purelogics', '31.512594', '74.368949143066', 'Pakistan', 'Punjab', 'Lahore District', 'Lahore', 'Lahore Cantt.', 'Lahore - Bedian Road', '-', '1508333389.jpg'),
(20, 'helllo', '31.517276943971', '74.32706376709', 'Pakistan', 'Punjab', 'Lahore District', 'Lahore', 'Garden Town', 'Ferozepur Road', '-', '1508333404.jpg'),
(21, 'I2C', '31.476293228694', '74.258055893555', 'Pakistan', 'Punjab', 'Lahore District', 'Lahore', 'Johar Town', 'Canal Bank Road', '-', '1508333565.jpg'),
(22, 'Purelogics', '31.470436946136', '74.319853989258', 'Pakistan', 'Punjab', 'Lahore District', 'Lahore', 'Johar Town', 'Street 3', '54600', '1508333892.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`company_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
