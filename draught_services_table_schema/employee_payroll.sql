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
  `phoneNumber` varchar(12) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `isSalaried` tinyint(1) DEFAULT NULL,
  `salary` decimal(13,2) DEFAULT NULL,
  `hourlyWage` decimal(5,2) DEFAULT NULL,
  `hoursWTD` decimal(10,2) DEFAULT 0.00,
  `paid_hours` decimal(10,2) DEFAULT 0.00,
  `unpaid_hours` decimal(10,2) DEFAULT 0.00,
  `isManager` tinyint(1) DEFAULT NULL,
  `PTO` decimal(10,2) DEFAULT 0.00,
  `clockedIn` tinyint(1) DEFAULT NULL,
  `timeClockedIn` datetime DEFAULT NULL,
  `timeClockedOut` datetime DEFAULT NULL,
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('1234567','John','Smith','1234 Main Street','15558675309','2022-01-01',NULL,0,NULL,23.00,0.00,0.00,0.49,0,25.00,0,'2023-11-22 22:15:50',NULL),('125456','Argyle','DeSilva','12 North St.','15553468056','2022-12-21',NULL,0,NULL,16.00,0.00,0.00,0.00,1,30.00,0,NULL,NULL),('234567','Beauford','Johnson','122 South Street.','15555342456','2022-03-11',NULL,1,900000.00,NULL,0.00,0.00,0.00,0,175.00,0,NULL,NULL),('263474','Brett','Lister','573 Chicken Ave.','15555555456','2022-03-21',NULL,1,100000.00,NULL,0.00,0.00,0.00,0,25.00,0,NULL,NULL),('425698','Esteban','Salamanca','427 West St.','15555551234','2021-02-22',NULL,0,NULL,33.00,0.00,0.00,0.00,1,25.00,0,NULL,NULL),('435478','Sam','Fisher','827 NSA St','15552535456','2022-01-01',NULL,1,70000.00,NULL,0.00,0.00,0.00,0,25.00,0,NULL,NULL),('435564','Nancy','Meyers','67 Left Blvd','15554635674','2022-10-11',NULL,1,78000.00,NULL,0.00,0.00,0.00,0,126.00,0,NULL,NULL),('4556789','Neil','Hector','12 North St.','15552558056','2022-11-01',NULL,0,NULL,36.00,0.00,0.00,0.00,1,30.00,0,NULL,NULL),('554666','Samantha','Tudor','1600 C Street','15552565674','2022-12-01',NULL,1,180000.00,NULL,0.00,0.00,0.00,0,126.00,0,NULL,NULL),('63274','Amber','Stone','2424 G Street','15552567856','2022-01-01',NULL,1,80000.00,NULL,0.00,0.00,0.00,0,11.00,0,NULL,NULL),('980445','Martin','Law','178 Law Drive.','15555315456','2022-03-21',NULL,1,100000.00,NULL,0.00,0.00,0.00,0,250.00,0,'2023-11-22 22:16:16',NULL);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `messageID` char(20) NOT NULL,
  `senderID` char(20) NOT NULL,
  `receiverID` char(20) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`messageID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule` (
  `employeeID` char(20) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  PRIMARY KEY (`employeeID`,`startTime`,`endTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES ('1234567','2023-11-25 04:00:00','2023-11-25 12:00:00'),('234567','2023-11-25 10:00:00','2023-11-25 16:00:00');
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-03 15:23:40
