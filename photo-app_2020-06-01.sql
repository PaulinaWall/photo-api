# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Värd: 127.0.0.1 (MySQL 5.6.37)
# Databas: photo-app
# Genereringstid: 2020-06-01 09:43:19 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Tabelldump album
# ------------------------------------------------------------

DROP TABLE IF EXISTS `album`;

CREATE TABLE `album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;

INSERT INTO `album` (`id`, `title`, `user_id`)
VALUES
	(38,'Knatte Fnatte Tjatte',7),
	(39,'Best friend',8),
	(40,'Love of my life',8);

/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;


# Tabelldump album_photo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `album_photo`;

CREATE TABLE `album_photo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `album_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `album_photo` WRITE;
/*!40000 ALTER TABLE `album_photo` DISABLE KEYS */;

INSERT INTO `album_photo` (`id`, `album_id`, `photo_id`)
VALUES
	(12,38,10),
	(13,38,11),
	(14,38,12),
	(15,38,13),
	(16,39,14),
	(17,39,15),
	(18,39,16),
	(19,40,17),
	(20,40,18),
	(21,40,19);

/*!40000 ALTER TABLE `album_photo` ENABLE KEYS */;
UNLOCK TABLES;


# Tabelldump photo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photo`;

CREATE TABLE `photo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;

INSERT INTO `photo` (`id`, `title`, `url`, `comment`, `user_id`)
VALUES
	(10,'Knatte Fnatte Tjatte','https://www.kalleanka.se/wp-content/uploads/3-keps.jpg',NULL,7),
	(11,'Me and the bastards','https://vignette.wikia.nocookie.net/kalleankasverige/images/0/0e/Knattarna.jpg/revision/latest/top-crop/width/300/height/300?cb=20130719143517&path-prefix=sv',NULL,7),
	(12,'Play','https://fisketavling.nu/images/teamlogos/20190822131522_knatte-fnatte-och-tjatte-112184050.jpg',NULL,7),
	(13,'Family','https://2.bp.blogspot.com/-cJgxoC_ieaY/TmHgutmRZDI/AAAAAAAAABQ/8BiSYTA-9Xc/s1600/h%25C3%25A4mta',NULL,7),
	(14,'My Best friend','https://img.fruugo.com/product/8/27/7700278_max.jpg',NULL,8),
	(15,'Cheers','https://www.kalleanka.se/wp-content/uploads/kallemussewebb-1080x675.jpg',NULL,8),
	(16,'Games','https://png.clipart.me/previews/763/mickey-mouse-and-donald-duck-34959.jpg',NULL,8),
	(17,'Mimmi','https://www.kalleanka.se/wp-content/uploads/GRATTIS_MUSSE-1080x675.jpg',NULL,8),
	(18,'Mimmi and I','https://www.kalleanka.se/wp-content/uploads/MUSSE-MIMMI.jpg',NULL,8),
	(19,'Heart','https://123emoji.com/wp-content/uploads/2017/08/mickeyandminnie-3.png',NULL,8);

/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;


# Tabelldump user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `email`, `password`, `first_name`, `last_name`)
VALUES
	(7,'kalle@anka.se','$2b$10$OtZLy1o9XjZ0diknKzPiqexKKVz3ls2TkcOFm5Pp7ggLlF5p8vM4y','Kalle','Anka'),
	(8,'musse@pigg.se','$2b$10$rQYC8mYN1QOcyqNpoA9yquI2ane8qm0NJpTYH5w0yvwzSF2.Dz9fW','Musse','Pigg');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
