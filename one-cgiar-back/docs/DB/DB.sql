create table roles
(
    id          int auto_increment
        primary key,
    description enum ('SGD', 'PI', 'GUEST', 'EVALUATOR', 'ADMIN') default 'SGD'                not null,
    createdAt   datetime(6)                                       default CURRENT_TIMESTAMP(6) not null,
    updatedAt   datetime(6)                                       default CURRENT_TIMESTAMP(6) not null,
    acronym     varchar(255)                                                                   not null
);

create table user
(
    id        int auto_increment
        primary key,
    username  varchar(255)                             not null,
    password  varchar(255)                             null,
    createdAt datetime(6) default CURRENT_TIMESTAMP(6) not null,
    updatedAt datetime(6) default CURRENT_TIMESTAMP(6) not null,
    firstname varchar(255)                             not null,
    lastname  varchar(255)                             not null,
    is_cgiar  tinyint     default 0                    not null,
    email     varchar(255)                             not null,
    constraint IDX_f4ca2c1e7c96ae6e8a7cca9df8
        unique (username, email)
);

create table initiative
(
    id                 int auto_increment
        primary key,
    name               varchar(255)                             not null,
    action_area        varchar(255)                             not null,
    global_budget      int                                      not null,
    challenge          varchar(255)                             not null,
    objetives          varchar(255)                             not null,
    results            varchar(255)                             not null,
    activities         varchar(255)                             not null,
    highlights         varchar(255)                             not null,
    createdAt          datetime(6) default CURRENT_TIMESTAMP(6) not null,
    updatedAt          datetime(6) default CURRENT_TIMESTAMP(6) not null,
    initiative_fk_user int                                      null,
    constraint FK_839e9e6a82bcd00d63a1afefe77
        foreign key (initiative_fk_user) references user (id)
);

create table user_roles_roles
(
    userId  int not null,
    rolesId int not null,
    primary key (userId, rolesId),
    constraint FK_0d0cc409255467b0ac4fe6b1693
        foreign key (userId) references user (id)
            on delete cascade,
    constraint FK_7521d8491e7c51f885e9f861e02
        foreign key (rolesId) references roles (id)
            on delete cascade
);

create index IDX_0d0cc409255467b0ac4fe6b169
    on user_roles_roles (userId);

create index IDX_7521d8491e7c51f885e9f861e0
    on user_roles_roles (rolesId);

