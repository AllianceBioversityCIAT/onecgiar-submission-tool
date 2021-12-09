import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
  TableUnique
} from 'typeorm';

export class CreateStageInitiativesTables1610740275759
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<any> {
    console.log('running migration for Stage-Initiatives tables / process');

    console.log('create initiatives table');
    await queryRunner.query(`
            CREATE TABLE initiatives (
                id int(11) NOT NULL AUTO_INCREMENT,
                name varchar(500) COLLATE utf8_bin NOT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);

    console.log('create stages table');
    await queryRunner.query(`
            CREATE TABLE stages (
                id int(11) NOT NULL AUTO_INCREMENT,
                description varchar(500) COLLATE utf8_bin NOT NULL,
                active tinyint(2) NOT NULL DEFAULT 0,
                start_date timestamp DEFAULT CURRENT_TIMESTAMP,
                end_date timestamp DEFAULT CURRENT_TIMESTAMP,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY UQ_33444257b15e655f155_stages (description)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);

    console.log('create initiatives_by_users table');
    await queryRunner.query(`
            CREATE TABLE initiatives_by_users (
                id int(11) NOT NULL AUTO_INCREMENT,
                initiativeId int(11) NOT NULL,
                userId int(11) NOT NULL,
                is_lead tinyint(2) NOT NULL DEFAULT 0,
                is_owner tinyint(2) NOT NULL DEFAULT 0,
                is_coordinator tinyint(2) NOT NULL DEFAULT 0,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_1ac95dad03d3a20b495aa6f7a1_initiativeId (initiativeId),
                KEY IDX_8b4c7595b7f033d7e492d6a2d9_userId (userId),
                PRIMARY KEY (id),
                CONSTRAINT FK_1ac95dad03d3a20b495bb6f7a19_initiatives FOREIGN KEY (initiativeId) REFERENCES initiatives (id) ON DELETE CASCADE,
                CONSTRAINT FK_8b4c7595b7f033d7e492cca2d96_users FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);

    console.log('create initiatives_by_stages table');
    await queryRunner.query(`
            CREATE TABLE initiatives_by_stages (
                id int(11) NOT NULL AUTO_INCREMENT,
                initiativeId int(11) NOT NULL,
                stageId int(11) NOT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_1ac95dad03220020b495aa6f7a1_initiativeId (initiativeId),
                KEY IDX_8b4c7595b78822d7e492d6a2d9_stageId (stageId),
                PRIMARY KEY (id),
                CONSTRAINT FK_1ac922a20b495bb6f7a19_initiatives FOREIGN KEY (initiativeId) REFERENCES initiatives (id) ON DELETE CASCADE,
                CONSTRAINT FK_8b4c2233d7e492cca2d96_stages FOREIGN KEY (stageId) REFERENCES stages (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);

    console.log('create act_ars_by_initv_stg table');
    await queryRunner.query(`
            CREATE TABLE act_ars_by_initv_stg (
                id int(11) NOT NULL AUTO_INCREMENT,
                action_area_id int(11) NOT NULL,
                initvStgId int(11) NOT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_initvStgId (initvStgId),
                PRIMARY KEY (id),
                CONSTRAINT FK_8b4c2238899492cca2d96_initv_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);

    console.log('create key_partners table');
    await queryRunner.query(`
            CREATE TABLE key_partners (
                id int(11) NOT NULL AUTO_INCREMENT,
                key_partner_id int(11) NOT NULL,
                toc_description varchar(1000) COLLATE utf8_bin NOT NULL,
                comparative_advantage varchar(1000) COLLATE utf8_bin NOT NULL,
                initvStgId int(11) NOT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_134654646767_initvStgId (initvStgId),
                PRIMARY KEY (id),
                CONSTRAINT FK_8b4c2233d99492cca2d96_initv_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);

    console.log('create concept_info table');
    await queryRunner.query(`
            CREATE TABLE concept_info (
                id int(11) NOT NULL AUTO_INCREMENT,
                name varchar(1000) COLLATE utf8_bin NOT NULL,
                challenge varchar(1000) COLLATE utf8_bin NOT NULL,
                objectives varchar(1000) COLLATE utf8_bin NOT NULL,
                results varchar(1000) COLLATE utf8_bin NOT NULL,
                highlights varchar(1000) COLLATE utf8_bin NOT NULL,
                action_area_description varchar(500) COLLATE utf8_bin NOT NULL,
                action_area_id int(11) NOT NULL,
                initvStgId int(11) NOT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_1ac922a20b495bb6f722222_initvStgId (initvStgId),
                PRIMARY KEY (id),
                CONSTRAINT FK_8b4c2233d0022112cca2d96_initv_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
