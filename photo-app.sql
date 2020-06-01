-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2020 at 08:10 AM
-- Server version: 5.6.37
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `photo-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE IF NOT EXISTS `album` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`id`, `title`, `user_id`) VALUES
(38, 'Knatte Fnatte Tjatte', 7),
(39, 'Best friend', 8),
(40, 'Love of my life', 8);

-- --------------------------------------------------------

--
-- Table structure for table `album_photo`
--

CREATE TABLE IF NOT EXISTS `album_photo` (
  `id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `album_photo`
--

INSERT INTO `album_photo` (`id`, `album_id`, `photo_id`) VALUES
(12, 38, 10),
(13, 38, 11),
(14, 38, 12),
(15, 38, 13),
(16, 39, 14),
(17, 39, 15),
(18, 39, 16),
(19, 40, 17),
(20, 40, 18),
(21, 40, 19);

-- --------------------------------------------------------

--
-- Table structure for table `photo`
--

CREATE TABLE IF NOT EXISTS `photo` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `photo`
--

INSERT INTO `photo` (`id`, `title`, `url`, `comment`, `user_id`) VALUES
(10, 'Knatte Fnatte Tjatte', 'https://www.kalleanka.se/wp-content/uploads/3-keps.jpg', NULL, 7),
(11, 'Me and the bastards', 'https://vignette.wikia.nocookie.net/kalleankasverige/images/0/0e/Knattarna.jpg/revision/latest/top-crop/width/300/height/300?cb=20130719143517&path-prefix=sv', NULL, 7),
(12, 'Play', 'https://fisketavling.nu/images/teamlogos/20190822131522_knatte-fnatte-och-tjatte-112184050.jpg', NULL, 7),
(13, 'Family', 'https://2.bp.blogspot.com/-cJgxoC_ieaY/TmHgutmRZDI/AAAAAAAAABQ/8BiSYTA-9Xc/s1600/h%25C3%25A4mta', NULL, 7),
(14, 'My Best friend', 'https://img.fruugo.com/product/8/27/7700278_max.jpg', NULL, 8),
(15, 'Cheers', 'https://www.kalleanka.se/wp-content/uploads/kallemussewebb-1080x675.jpg', NULL, 8),
(16, 'Games', 'https://png.clipart.me/previews/763/mickey-mouse-and-donald-duck-34959.jpg', NULL, 8),
(17, 'Mimmi', 'https://www.kalleanka.se/wp-content/uploads/GRATTIS_MUSSE-1080x675.jpg', NULL, 8),
(18, 'Mimmi and I', 'https://www.kalleanka.se/wp-content/uploads/MUSSE-MIMMI.jpg', NULL, 8),
(19, 'Heart', 'https://123emoji.com/wp-content/uploads/2017/08/mickeyandminnie-3.png', NULL, 8);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
(7, 'kalle@anka.se', '$2b$10$OtZLy1o9XjZ0diknKzPiqexKKVz3ls2TkcOFm5Pp7ggLlF5p8vM4y', 'Kalle', 'Anka'),
(8, 'musse@pigg.se', '$2b$10$rQYC8mYN1QOcyqNpoA9yquI2ane8qm0NJpTYH5w0yvwzSF2.Dz9fW', 'Musse', 'Pigg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `album_photo`
--
ALTER TABLE `album_photo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `album`
--
ALTER TABLE `album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT for table `album_photo`
--
ALTER TABLE `album_photo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `photo`
--
ALTER TABLE `photo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
