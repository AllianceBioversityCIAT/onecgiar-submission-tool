CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) COLLATE utf8_bin NOT NULL,
    `last_name` varchar(255) COLLATE utf8_bin NOT NULL,
    `email` varchar(255) COLLATE utf8_bin NOT NULL,
    `password` varchar(255) COLLATE utf8_bin DEFAULT NULL,
    `is_cgiar` tinyint(4) NOT NULL DEFAULT '0',
    `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`id`),
    UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;


CREATE TABLE `roles` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `acronym` varchar(255) COLLATE utf8_bin NOT NULL,
    `description` enum('SGD', 'PI', 'GUEST', 'EVALUATOR', 'ADMIN') COLLATE utf8_bin NOT NULL DEFAULT 'SGD',
    `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `name` varchar(255) COLLATE utf8_bin NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;


CREATE TABLE `permissions` (
    `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `resource` varchar(255) COLLATE utf8_bin NOT NULL,
    `action` varchar(255) COLLATE utf8_bin NOT NULL,
    `attributes` varchar(255) COLLATE utf8_bin NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;


CREATE TABLE `roles_by_users` (
    `role_id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    PRIMARY KEY (`role_id`, `user_id`),
    KEY `IDX_1ac95dad03d3a20b495aa6f7a1` (`role_id`),
    KEY `IDX_8b4c7595b7f033d7e492d6a2d9` (`user_id`),
    CONSTRAINT `FK_1ac95dad03d3a20b495aa6f7a19` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_8b4c7595b7f033d7e492d6a2d96` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;


CREATE TABLE `permissions_by_roles` (
    `permission_id` int(11) NOT NULL,
    `roles_id` int(11) NOT NULL,
    PRIMARY KEY (`permission_id`, `roles_id`),
    KEY `IDX_c73c26f64f6477062784c991f0` (`permission_id`),
    KEY `IDX_330665ea44e4a3dfc82e9d800f` (`roles_id`),
    CONSTRAINT `FK_330665ea44e4a3dfc82e9d800f1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_c73c26f64f6477062784c991f0b` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;