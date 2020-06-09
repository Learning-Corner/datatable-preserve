DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `name` varchar(255) default NULL,
  `surname` varchar(255) default NULL,
  `email` varchar(255) default NULL,
  `date_of_birth` datetime,
  `personal_number` varchar(13) default NULL,
  `settings_preserved` boolean default false,
  PRIMARY KEY (`id`)
);