import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateClarisaSDGTargetsTable1643204587082
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Add clarisa_sdg_targets');
    await queryRunner.query(`
                    CREATE TABLE clarisa_sdg_targets (
                        id int(11) NOT NULL,
                        sdg_target_code TEXT DEFAULT NULL,
                        sdg_target TEXT DEFAULT NULL,
                        sdg JSON DEFAULT NULL,
                        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        PRIMARY KEY (id)               
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
                `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
