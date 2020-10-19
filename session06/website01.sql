-- mysql -h 127.0.0.1 -u root -p < website01.sql

CREATE USER `website01`@`%` IDENTIFIED WITH mysql_native_password BY 'eLow8yBSp34wXx';

CREATE DATABASE IF NOT EXISTS `website01` DEFAULT CHARACTER SET utf8;
USE `website01`;

GRANT ALL PRIVILEGES ON `website01`.* TO `website01`@`%`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) UNIQUE COLLATE utf8_unicode_ci,
  `password` varchar(256) COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


INSERT INTO `users` (`id`, `name`, `password`) VALUES
  (1, 'admin', SHA2('abc', 256));


CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int,
  `title` varchar(256) COLLATE utf8_unicode_ci,
  `content` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


INSERT INTO `posts` (`id` ,`date`, `user_id`, `title`, `content`) VALUES
  (1, '2020-06-26 17:27:49', 1, 'Post 1', '<p>Content for post 1</p>'),
  (2, '2020-08-08 11:17:16', 1, 'Post 2', '<p>Content for post 2</p>');


