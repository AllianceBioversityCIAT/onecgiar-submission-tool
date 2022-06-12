import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateSubmissionsTable1642100478752 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create submissions table');
    await queryRunner.query(`
        CREATE TABLE submissions (
            id int(11) NOT NULL AUTO_INCREMENT,
            initvStgId int(11) NOT NULL,
            missing TEXT DEFAULT NULL,
            complete tinyint(2) NOT NULL DEFAULT 1,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411yy88989_initvStgId (initvStgId),
            PRIMARY KEY (id),
            CONSTRAINT FK_8455777994989pp456700_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
