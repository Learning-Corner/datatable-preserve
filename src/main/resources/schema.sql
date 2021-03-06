DROP TABLE IF EXISTS `settings`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `name` varchar(255) default NULL,
  `surname` varchar(255) default NULL,
  `email` varchar(255) default NULL,
  `date_of_birth` datetime,
  `personal_number` varchar(13) default NULL,
  `settings_persisted` boolean default false,
  PRIMARY KEY (`id`)
);

CREATE TABLE `user_settings` (
    `key` varchar(25) NOT NULL,
    `settings` CLOB NOT NULL,
    PRIMARY KEY (`key`)
);