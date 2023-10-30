-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: employee_payroll
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `employeeID` char(20) NOT NULL,
  `firstName` varchar(20) DEFAULT NULL,
  `lastName` varchar(20) DEFAULT NULL,
  `employeeAddress` varchar(100) DEFAULT NULL,
  `email` varchar(70) DEFAULT NULL,
  `phoneNumber` varchar(12) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `isSalaried` tinyint(1) DEFAULT NULL,
  `salary` decimal(13,2) DEFAULT NULL,
  `hourlyWage` decimal(5,2) DEFAULT NULL,
  `hoursWTD` decimal(5,2) DEFAULT NULL,
  `paid_hours` decimal(5,2) DEFAULT NULL,
  `unpaid_hours` decimal(5,2) DEFAULT NULL,
  `isManager` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('1234567','John','Smith','1234 Main Street','jsmith@aol.com','15558675309','2022-01-01',NULL,0,NULL,23.00,22.50,11.25,11.25,0),('425698','Esteban','Salamanca','427 West St.','lemmings@comcast.net','15555551234','2021-02-22',NULL,0,NULL,33.00,22.50,11.25,11.25,1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friday_shift`
--

DROP TABLE IF EXISTS `friday_shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friday_shift` (
  `shiftID` varchar(20) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `employeeID` char(20) DEFAULT NULL,
  `message` text DEFAULT NULL,
  PRIMARY KEY (`shiftID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `friday_shift_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friday_shift`
--

LOCK TABLES `friday_shift` WRITE;
/*!40000 ALTER TABLE `friday_shift` DISABLE KEYS */;
/*!40000 ALTER TABLE `friday_shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monday_shift`
--

DROP TABLE IF EXISTS `monday_shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monday_shift` (
  `shiftID` varchar(20) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `employeeID` char(20) DEFAULT NULL,
  `message` text DEFAULT NULL,
  PRIMARY KEY (`shiftID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `monday_shift_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monday_shift`
--

LOCK TABLES `monday_shift` WRITE;
/*!40000 ALTER TABLE `monday_shift` DISABLE KEYS */;
/*!40000 ALTER TABLE `monday_shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saturday_shift`
--

DROP TABLE IF EXISTS `saturday_shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `saturday_shift` (
  `shiftID` varchar(20) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `employeeID` char(20) DEFAULT NULL,
  `message` text DEFAULT NULL,
  PRIMARY KEY (`shiftID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `saturday_shift_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saturday_shift`
--

LOCK TABLES `saturday_shift` WRITE;
/*!40000 ALTER TABLE `saturday_shift` DISABLE KEYS */;
/*!40000 ALTER TABLE `saturday_shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule` (
  `shiftID` varchar(20) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `employeeID` char(20) DEFAULT NULL,
  PRIMARY KEY (`shiftID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sunday_shift`
--

DROP TABLE IF EXISTS `sunday_shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sunday_shift` (
  `shiftID` varchar(20) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `employeeID` char(20) DEFAULT NULL,
  `message` text DEFAULT NULL,
  PRIMARY KEY (`shiftID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `sunday_shift_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sunday_shift`
--

LOCK TABLES `sunday_shift` WRITE;
/*!40000 ALTER TABLE `sunday_shift` DISABLE KEYS */;
/*!40000 ALTER TABLE `sunday_shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thursday_shift`
--

DROP TABLE IF EXISTS `thursday_shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thursday_shift` (
  `shiftID` varchar(20) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `employeeID` char(20) DEFAULT NULL,
  `message` text DEFAULT NULL,
  PRIMARY KEY (`shiftID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `thursday_shift_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thursday_shift`
--

LOCK TABLES `thursday_shift` WRITE;
/*!40000 ALTER TABLE `thursday_shift` DISABLE KEYS */;
/*!40000 ALTER TABLE `thursday_shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tuesday_shift`
--

DROP TABLE IF EXISTS `tuesday_shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tuesday_shift` (
  `shiftID` varchar(20) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `employeeID` char(20) DEFAULT NULL,
  `message` text DEFAULT NULL,
  PRIMARY KEY (`shiftID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `tuesday_shift_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tuesday_shift`
--

LOCK TABLES `tuesday_shift` WRITE;
/*!40000 ALTER TABLE `tuesday_shift` DISABLE KEYS */;
/*!40000 ALTER TABLE `tuesday_shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wednesday_shift`
--

DROP TABLE IF EXISTS `wednesday_shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wednesday_shift` (
  `shiftID` varchar(20) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `employeeID` char(20) DEFAULT NULL,
  `message` text DEFAULT NULL,
  PRIMARY KEY (`shiftID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `wednesday_shift_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wednesday_shift`
--

LOCK TABLES `wednesday_shift` WRITE;
/*!40000 ALTER TABLE `wednesday_shift` DISABLE KEYS */;
/*!40000 ALTER TABLE `wednesday_shift` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-25 16:21:38
