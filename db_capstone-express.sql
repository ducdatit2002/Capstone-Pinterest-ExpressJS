/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `commentId` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `users_id` int DEFAULT NULL,
  `images_id` int DEFAULT NULL,
  PRIMARY KEY (`commentId`),
  KEY `users_id` (`users_id`),
  KEY `images_id` (`images_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`userId`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`images_id`) REFERENCES `images` (`imageId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `imageId` int NOT NULL AUTO_INCREMENT,
  `imageName` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `users_id` int DEFAULT NULL,
  PRIMARY KEY (`imageId`),
  KEY `users_id` (`users_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `saved`;
CREATE TABLE `saved` (
  `isSaved` int DEFAULT NULL,
  `users_id` int NOT NULL,
  `images_id` int NOT NULL,
  PRIMARY KEY (`users_id`,`images_id`),
  KEY `images_id` (`images_id`),
  CONSTRAINT `saved_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `saved_ibfk_2` FOREIGN KEY (`images_id`) REFERENCES `images` (`imageId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userName` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comments` (`commentId`, `content`, `users_id`, `images_id`) VALUES
(1, 'tấm này nhìn chị chất quá', 1, 3);
INSERT INTO `comments` (`commentId`, `content`, `users_id`, `images_id`) VALUES
(2, 'Hình đẹp quớ à', 1, 17);
INSERT INTO `comments` (`commentId`, `content`, `users_id`, `images_id`) VALUES
(3, 'She is so beautifyll', 1, 18);

INSERT INTO `images` (`imageId`, `imageName`, `imageUrl`, `users_id`) VALUES
(1, 'Iron Man', '1698330938418_ironman.jpg', 1);
INSERT INTO `images` (`imageId`, `imageName`, `imageUrl`, `users_id`) VALUES
(2, 'Girl Neon with sword', '1698331041484_girlneon4.jpg', 1);
INSERT INTO `images` (`imageId`, `imageName`, `imageUrl`, `users_id`) VALUES
(3, 'Girl Army', '1698331098773_girlattack.jpg', 5);
INSERT INTO `images` (`imageId`, `imageName`, `imageUrl`, `users_id`) VALUES
(4, 'Black Girl Beauty', '1698331148551_girlneon3.jpg', 5),
(5, 'Man white hair', '1698331214487_mansit.jpg', 1),
(6, 'Girl with pink hair', '1698331267383_girlpink.jpg', 1),
(7, 'Ninja man with white hair', '1698331301721_ninja.jpg', 5),
(8, 'Strong Girl', '1698331340096_girlattack2.jpg', 5),
(9, 'Girl with two tiger', '1698331371132_girltiger.jpg', 1),
(10, 'Baby Spiderman', '1698331427235_nguoi_nhen.jpg', 1),
(11, 'Girl cover eye', '1698331459497_girlcovereye.jpg', 5),
(12, 'Robot Girl', '1698331496853_girlrobot.jpg', 5),
(13, 'Girl army with Gun', '1698331538971_girlgun.jpg', 1),
(14, 'Girl white hair with sword', '1698331595943_girlrobot2.jpg', 1),
(15, 'baby boy on the car', '1698331629416_mansitoncar.jpg', 5),
(16, 'Girl mask', '1698331674466_girlmarsk.jpg', 5),
(17, 'Baby yellow boy', '1698331692657_yellowman.jpg', 1),
(18, 'Sexy Girl', '1698331741422_girlneon.jpg', 1);

INSERT INTO `saved` (`isSaved`, `users_id`, `images_id`) VALUES
(1, 1, 1);
INSERT INTO `saved` (`isSaved`, `users_id`, `images_id`) VALUES
(1, 1, 2);
INSERT INTO `saved` (`isSaved`, `users_id`, `images_id`) VALUES
(1, 1, 3);
INSERT INTO `saved` (`isSaved`, `users_id`, `images_id`) VALUES
(1, 1, 4),
(0, 1, 5),
(1, 1, 18),
(1, 5, 1),
(1, 5, 2),
(1, 5, 3),
(0, 5, 4),
(0, 5, 7),
(1, 5, 8),
(0, 5, 16);

INSERT INTO `users` (`userId`, `userName`, `fullName`, `email`, `password`, `phoneNumber`) VALUES
(1, 'phamducdat', 'Phạm Đức Đạt', 'phamducdat@gmail.com', '$2a$10$pz2ByR/pkAmJz2WsXVaQO.1GCRS2j2C6zJzaEPxPVAvdf.HKvNoIa', '0902850103');
INSERT INTO `users` (`userId`, `userName`, `fullName`, `email`, `password`, `phoneNumber`) VALUES
(2, 'tranngocnhan', 'Trần Ngọc Nhân', 'ngocnhan@mailinator.com', '$2a$10$N/RZ18nvOuku53LIlh/rxOWvJD98wFw7..0Dv6RZC/9Rfk9c3XYqy', '0836789578');
INSERT INTO `users` (`userId`, `userName`, `fullName`, `email`, `password`, `phoneNumber`) VALUES
(3, 'wyvyjasepi', 'Jelani Ball', 'bituvine@mailinator.com', '$2a$10$Ou40Kry9BxgnGNV0ZAlEJ.lQ/fd8RrkZqoN/6YN49VZbFHaldSnh6', '0836789578');
INSERT INTO `users` (`userId`, `userName`, `fullName`, `email`, `password`, `phoneNumber`) VALUES
(4, 'pybizihydy', 'Dara Patrick', 'culenydisi@mailinator.com', '$2a$10$2X4jY8ZDn2zzIhr4zr.AhuGcVEA5JNRFGN6wu1gGKONDYOAZknmtO', '0836789578'),
(5, 'khachhang', 'Khách Hang', 'khachhang@gmail.com', '$2a$10$wNt78u4nEjrFPk2IUgC2PuFXevJHPyCEpLn/TEJ/fXDhmAWQyuG6C', '1234567891'),
(6, 'hejemeceb', 'Chastity Lang', 'tugyr@mailinator.com', '$2a$10$IgB2K9Ul11vZIrRGGgyEIO5bVrpfSdU1KxKWUswJhhpN2b5tcAxFG', '1234567899');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;