import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateStageMetadaTable1614963554327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Add stages_meta');
    let order_col = '`order` int(11) NOT NULL DEFAULT 0,';
    await queryRunner.query(`
            CREATE TABLE stages_meta (
                id int(11) NOT NULL AUTO_INCREMENT,
                ${order_col}               
                group_by varchar(500) COLLATE utf8_bin DEFAULT NULL,
                col_name varchar(250) COLLATE utf8_bin DEFAULT NULL,
                display_name varchar(250) COLLATE utf8_bin DEFAULT NULL,
                stage_name varchar(500) COLLATE utf8_bin DEFAULT NULL,
                active tinyint(2) NOT NULL DEFAULT 0,
                visible tinyint(2) NOT NULL DEFAULT 0,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                stageId int(11) DEFAULT NULL,
                KEY IDX_1354654466464321_stageId (stageId),
                PRIMARY KEY (id),
                CONSTRAINT FK_84558889466492cca2d96_stages FOREIGN KEY (stageId) REFERENCES stages (id) ON DELETE CASCADE
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
