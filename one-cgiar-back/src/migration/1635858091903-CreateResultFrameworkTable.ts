import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateResultFrameworkTable1635858091903
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create results framework table');
    await queryRunner.query(`
        CREATE TABLE results_framework (
            id int(11) NOT NULL AUTO_INCREMENT,
            melia_id int(11) NOT NULL,
            name TEXT DEFAULT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411ee89856_melia_id (melia_id),
            PRIMARY KEY (id),
            CONSTRAINT FK_845588899492qhd456789_melia FOREIGN KEY (melia_id) REFERENCES melia (id) ON DELETE CASCADE,
            CONSTRAINT melia_id UNIQUE (melia_id)
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
