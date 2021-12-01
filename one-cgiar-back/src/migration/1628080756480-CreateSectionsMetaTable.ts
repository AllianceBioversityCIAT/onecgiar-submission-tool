import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateSectionsMetaTable1628080756480
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Add sections_meta');
    await queryRunner.query(`
            CREATE TABLE sections_meta (
                id int(11) NOT NULL AUTO_INCREMENT,             
                description varchar(250) COLLATE utf8_bin DEFAULT NULL,
                display_name varchar(250) COLLATE utf8_bin DEFAULT NULL,
                stage_name varchar(500) COLLATE utf8_bin DEFAULT NULL,
                active tinyint(2) NOT NULL DEFAULT 0,
                visible tinyint(2) NOT NULL DEFAULT 0,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                stageId int(11) DEFAULT NULL,
                KEY IDX_1354654466465432_stageId (stageId),
                PRIMARY KEY (id),
                CONSTRAINT FK_84558889466492cca2f97_stages FOREIGN KEY (stageId) REFERENCES stages (id) ON DELETE CASCADE
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
