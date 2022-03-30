import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateContextTable1626271318977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create context table');
    await queryRunner.query(`
        CREATE TABLE context (
            id int(11) NOT NULL AUTO_INCREMENT,
            initvStgId int(11) NOT NULL,
            challenge_statement TEXT DEFAULT NULL,
            smart_objectives TEXT DEFAULT NULL,
            key_learnings TEXT DEFAULT NULL,
            priority_setting TEXT DEFAULT NULL,
            comparative_advantage TEXT DEFAULT NULL,
            participatory_design TEXT DEFAULT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_1354654117589921_initvStgId (initvStgId),
            PRIMARY KEY (id),
            CONSTRAINT FK_845588899492asd45583_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
