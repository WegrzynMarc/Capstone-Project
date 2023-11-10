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
  `hoursWTD` decimal(5,2) DEFAULT NULL,
  `paid_hours` decimal(5,2) DEFAULT NULL,
  `unpaid_hours` decimal(5,2) DEFAULT NULL,
  `isManager` tinyint(1) DEFAULT NULL,
  `PTO` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES 
('000000','System','Message','NULL','15550000000','2022-01-01',NULL,0,NULL,0,0,0,0,1,0),
('000001','John','Smith','1234 Main Street','15558675309','2022-01-01',NULL,0,NULL,23.00,22.50,11.25,11.25,0,25.00),('000002','Argyle','DeSilva','12 North St.','15553468056','2022-12-21',NULL,0,NULL,16.00,22.50,11.25,11.25,1,30.00),('000003','Beauford','Johnson','122 South Street.','15555342456','2022-03-11',NULL,1,900000.00,NULL,22.50,11.25,11.25,0,175.00),('000004','Brett','Lister','573 Chicken Ave.','15555555456','2022-03-21',NULL,1,100000.00,NULL,22.50,11.25,11.25,0,25.00),('000005','Esteban','Salamanca','427 West St.','15555551234','2021-02-22',NULL,0,NULL,33.00,22.50,11.25,11.25,1,25.00),('000006','Sam','Fisher','827 NSA St','15552535456','2022-01-01',NULL,1,70000.00,NULL,22.50,11.25,11.25,0,25.00),('000007','Nancy','Meyers','67 Left Blvd','15554635674','2022-10-11',NULL,1,78000.00,NULL,22.50,11.25,11.25,0,126.00),('000008','Neil','Hector','12 North St.','15552558056','2022-11-01',NULL,0,NULL,36.00,22.50,11.25,11.25,1,30.00),('000009','Samantha','Tudor','1600 C Street','15552565674','2022-12-01',NULL,1,180000.00,NULL,22.50,11.25,11.25,0,126.00),('000010','Amber','Stone','2424 G Street','15552567856','2022-01-01',NULL,1,80000.00,NULL,22.50,11.25,11.25,0,11.00),('000011','Martin','Law','178 Law Drive.','15555315456','2022-03-21',NULL,1,100000.00,NULL,22.50,11.25,11.25,0,250.00);
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
  `date` date DEFAULT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`messageID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES 
('000000', '000002', '000001', '2023-01-01', "Insert Message Here"),
('000001', '000002', '000003', '2023-01-01', "Insert Message Here"),
('000002', '000000', '000001', '2023-01-01', "Flagged for X"),
('000003', '000000', '000003', '2023-01-01', "Flagged for Y"),
('000004', '000002', '000004', '2023-01-01', "Insert Message Here"),
('000005', '000002', '000005', '2023-01-01', "Never Gonna Give You Up"),
('000006', '000002', '000006', '2023-01-01', "Never Gonna Let You Down"),
('000007', '000002', '000007', '2023-01-01', "Insert Message Here"),
('000008', '000002', '000008', '2023-01-01', "Insert Message Here"),
('000009', '000002', '000009', '2023-01-01', "Insert Message Here"),
('000010', '000002', '000011', '2023-01-01', "Insert Message Here"),
('000011', '000007', '000001', '2023-01-01', "Insert Message Here"),
('000012', '000007', '000003', '2023-01-01', "Insert Message Here"),
('000013', '000007', '000004', '2023-01-01', "Insert Message Here"),
('000014', '000007', '000005', '2023-01-01', "Insert Message Here"),
('000015', '000007', '000006', '2023-01-01', "Insert Message Here"),
('000016', '000007', '000010', '2023-01-01', "Insert Message Here");
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
INSERT INTO `schedule` VALUES ('000001','2023-11-25 04:00:00','2023-11-25 12:00:00'),('000002','2023-11-25 10:00:00','2023-11-25 16:00:00');
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
