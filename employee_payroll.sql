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
  `clockedIn` tinyint(1) DEFAULT NULL,
  `timeClockedIn` datetime DEFAULT NULL,
  `timeClockedOut` datetime DEFAULT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES 
('000000', 'System', 'Message', 'NA', '0', '2022-01-01',NULL,0,NULL,0,0,0,0,0,0,0,'',NULL, 'hjklgafsd', 'bvaibivbaretaqhgadfs'),
('000001','John','Smith','1234 Main Street','15558675309','2022-01-01',NULL,0,NULL,23.00,0.00,0.00,0.49,            0,25.00,0,'2023-11-22 22:15:50',NULL, 'Account1', 'Admin'),
('000002','Argyle','DeSilva','12 North St.','15553468056','2022-12-21',NULL,0,NULL,16.00,0.00,0.00,0.00,            1,30.00,0,NULL,NULL, 'Manager1', 'Admin'),
('000003','Beauford','Johnson','122 South Street.','15555342456','2022-03-11',NULL,1,900000.00,NULL,0.00,0.00,0.00, 0,175.00,0,NULL,NULL, 'Account2', 'Admin'),
('000004','Brett','Lister','573 Chicken Ave.','15555555456','2022-03-21',NULL,1,100000.00,NULL,0.00,0.00,0.00,      0,25.00,0,NULL,NULL, 'Account3', 'Admin'),
('000005','Esteban','Salamanca','427 West St.','15555551234','2021-02-22',NULL,0,NULL,33.00,0.00,0.00,0.00,         1,25.00,0,NULL,NULL, 'Manager2', 'Admin'),
('000006','Sam','Fisher','827 NSA St','15552535456','2022-01-01',NULL,1,70000.00,NULL,0.00,0.00,0.00,               0,25.00,0,NULL,NULL, 'Account4', 'Admin'),
('000007','Nancy','Meyers','67 Left Blvd','15554635674','2022-10-11',NULL,1,78000.00,NULL,0.00,0.00,0.00,           1,126.00,0,NULL,NULL, 'Manager2', 'Admin'),
('000008','Neil','Hector','12 North St.','15552558056','2022-11-01',NULL,0,NULL,36.00,0.00,0.00,0.00,               0,30.00,0,NULL,NULL, 'Account5', 'Admin'),
('000009','Samantha','Tudor','1600 C Street','15552565674','2022-12-01',NULL,1,180000.00,NULL,0.00,0.00,            0.00,0,126.00,0,NULL,NULL, 'Account6', 'Admin'),
('000010','Amber','Stone','2424 G Street','15552567856','2022-01-01',NULL,1,80000.00,NULL,0.00,0.00,0.00,           0,11.00,0,NULL,NULL, 'Account7', 'Admin'),
('000011','Martin','Law','178 Law Drive.','15555315456','2022-03-21',NULL,1,100000.00,NULL,0.00,0.00,0.00,          0,250.00,0,'2023-11-22 22:16:16',NULL, 'Account8', 'Admin');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `messageID` int NOT NULL AUTO_INCREMENT,
  `senderID` char(20) NOT NULL,
  `receiverID` char(20) NOT NULL,
  `date` date NOT NULL,
  `hours` char(20) NOT NULL,
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
('000000', '000002', '000001', '2023-11-01', 0, "Just to let you know, make sure the doors are locked when you leave."),
('000001', '000002', '000003', '2023-11-01', 0, "Keep the workplace clean, and remember to throw away any trash you make."),
('000002', '000000', '000001', '2023-11-01', 12,"Flagged for working beyond scheduled hours"),
('000003', '000000', '000003', '2023-11-01', 9, "Flagged for working on a day not scheduled"),
('000004', '000002', '000004', '2023-11-01', 0, "No drinking while on the job. Consider this a warning."),
('000005', '000002', '000005', '2023-11-01', 0, "This is a complex message designed to show the messaging system works. This text is filler and designed to showcase how the message system breaks things down."),
('000006', '000002', '000006', '2023-11-01', 0, "Generic Message to show the system works"),
('000007', '000002', '000007', '2023-11-01', 0, "Generic Message to show the system works"),
('000008', '000002', '000008', '2023-11-01', 0, "Generic Message to show the system works"),
('000009', '000002', '000009', '2023-11-01', 0, "Generic Message to show the system works"),
('000010', '000002', '000011', '2023-11-01', 0, "Generic Message to show the system works"),
('000011', '000007', '000001', '2023-11-01', 0, "Generic Message to show the system works"),
('000012', '000007', '000003', '2023-11-01', 0, "Generic Message to show the system works"),
('000013', '000007', '000004', '2023-11-01', 0, "Generic Message to show the system works"),
('000014', '000007', '000005', '2023-11-01', 0, "Generic Message to show the system works"),
('000015', '000007', '000006', '2023-11-01', 0, "Generic Message to show the system works"),
('000016', '000007', '000010', '2023-01-01', 0, "Generic Message to show the system works"),
('000017', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000018', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000019', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000020', '000003', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000021', '000003', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000022', '000003', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000023', '000004', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000024', '000004', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000025', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000026', '000004', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000027', '000004', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000028', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000029', '000005', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000030', '000005', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000031', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000032', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000033', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000034', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000035', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000036', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000037', '000006', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000038', '000006', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000039', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000040', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000041', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000042', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000043', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000044', '000002', '000001', '2023-01-01', 0, "Generic Message to show the system works"),
('000045', '000007', '000001', '2023-01-01', 0, "Generic Message to show the system works");
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
  `startDate` date NOT NULL,
  `startTime` time NOT NULL,
  `endDate` date NOT NULL,
  `endTime` time NOT NULL,
  PRIMARY KEY (`employeeID`,`startDate`,`startTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES 
('000001','2023-11-27', '08:00:00','2023-11-27', '16:00:00'),
('000001','2023-11-28', '09:00:00','2023-11-28', '17:00:00'),
('000001','2023-11-29', '13:00:00','2023-11-29', '18:00:00'),
('000001','2023-11-30', '16:00:00','2023-11-30', '18:00:00'),
('000001','2023-12-01', '08:30:00','2023-12-01', '19:30:00'),
('000001','2023-12-02', '10:00:00','2023-12-02', '16:00:00');
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
