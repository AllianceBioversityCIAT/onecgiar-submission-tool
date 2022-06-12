import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateTableClarisaGlobalTargets1635258275070
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create Clarisa global targets');
    await queryRunner.query(`
        CREATE TABLE clarisa_global_targets (
            id int(11) NOT NULL,
            impact_area_id int(11) NOT NULL,
            impact_area_name TEXT DEFAULT NULL,
            target TEXT DEFAULT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
