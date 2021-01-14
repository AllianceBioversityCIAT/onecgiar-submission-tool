CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `is_cgiar` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_97672ac88f789774dd47f7c8be3` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `acronym` varchar(255) COLLATE utf8_bin NOT NULL,
  `name` varchar(500) COLLATE utf8_bin NOT NULL,
  `description` varchar(500) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_8943b80a3d10c257b15e655f155` (`acronym`),
  UNIQUE KEY `UQ_648e3f5447f725579d7d4ffdfb7` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resource` varchar(255) COLLATE utf8_bin NOT NULL,
  `action` varchar(255) COLLATE utf8_bin NOT NULL,
  `attributes` varchar(255) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


CREATE TABLE `roles_by_users` (
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`user_id`),
  KEY `IDX_1ac95dad03d3a20b495aa6f7a1` (`role_id`),
  KEY `IDX_8b4c7595b7f033d7e492d6a2d9` (`user_id`),
  CONSTRAINT `FK_1ac95dad03d3a20b495aa6f7a19` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_8b4c7595b7f033d7e492d6a2d96` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;




CREATE TABLE `permissions_by_roles` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `IDX_c73c26f64f6477062784c991f0` (`permission_id`),
  KEY `IDX_330665ea44e4a3dfc82e9d800f` (`role_id`),
  CONSTRAINT `FK_05d5b8a78558b189de928478b64` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_c73c26f64f6477062784c991f0b` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

------ stages and initiatives -----------


CREATE TABLE `initiatives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `stages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(500) COLLATE utf8_bin NOT NULL,
  `active` tinyint(2) NOT NULL DEFAULT '0',
  `start_date` timestamp DEFAULT NULL,
  `end_date` timestamp DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_33444257b15e655f155_stages` (`description`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



CREATE TABLE `initiatives_by_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `initiativeId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `is_lead` tinyint(2) NOT NULL DEFAULT '0',
  `is_owner` tinyint(2) NOT NULL DEFAULT '0',
  `is_coordinator` tinyint(2) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `IDX_1ac95dad03d3a20b495aa6f7a1` (`initiativeId`),
  KEY `IDX_8b4c7595b7f033d7e492d6a2d9` (`userId`),
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_1ac95dad03d3a20b495bb6f7a19_initiatives` FOREIGN KEY (`initiativeId`) REFERENCES `initiatives` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_8b4c7595b7f033d7e492cca2d96_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


CREATE TABLE `initiatives_by_stages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `initiativeId` int(11) NOT NULL,
  `stageId` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `IDX_1ac95dad03d3a20b495aa6f7a1` (`initiativeId`),
  KEY `IDX_8b4c7595b7f033d7e492d6a2d9` (`stageId`),
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_1ac922a20b495bb6f7a19_initiatives` FOREIGN KEY (`initiativeId`) REFERENCES `initiatives` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_8b4c2233d7e492cca2d96_stages` FOREIGN KEY (`stageId`) REFERENCES `stages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


CREATE TABLE `act_ars_by_initv_stg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_area_id` int(11) NOT NULL,
  `initvStgId` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `IDX_initvStgId` (`initvStgId`),
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_8b4c2238899492cca2d96_initv_stages` FOREIGN KEY (`initvStgId`) REFERENCES `initiatives_by_stages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


CREATE TABLE `key_partners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key_partner_id` int(11) NOT NULL,
  `toc_description` varchar(1000) COLLATE utf8_bin NOT NULL,
  `comparative_advantage` varchar(1000) COLLATE utf8_bin NOT NULL,
  `initvStgId` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `IDX__initvStgId` (`initvStgId`),
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_8b4c2233d99492cca2d96_initv_stages` FOREIGN KEY (`initvStgId`) REFERENCES `initiatives_by_stages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


CREATE TABLE `concept_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) COLLATE utf8_bin NOT NULL,
  `challenge` varchar(1000) COLLATE utf8_bin NOT NULL,
  `objectives` varchar(1000) COLLATE utf8_bin NOT NULL,
  `results` varchar(1000) COLLATE utf8_bin NOT NULL,
  `highlights` varchar(1000) COLLATE utf8_bin NOT NULL,
  `action_area_description` varchar(500) COLLATE utf8_bin NOT NULL,
  `action_area_id` int(11) NOT NULL,
  `initvStgId` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `IDX_1ac922a20b495bb6f722222_initvStgId` (`initvStgId`),
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_8b4c2233d0022112cca2d96_initv_stages` FOREIGN KEY (`initvStgId`) REFERENCES `initiatives_by_stages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;