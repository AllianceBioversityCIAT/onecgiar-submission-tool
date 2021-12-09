import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateClarisaInstitutionsTable1620131306362
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Add clarisa_institutions');
    await queryRunner.query(`
            CREATE TABLE clarisa_institutions (
                id int(11) NOT NULL AUTO_INCREMENT,
                acronym TEXT DEFAULT NULL,
                code int(11) DEFAULT NULL,
                country_name TEXT DEFAULT NULL,
                name TEXT DEFAULT NULL,
                data JSON DEFAULT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

                PRIMARY KEY (id)               
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
