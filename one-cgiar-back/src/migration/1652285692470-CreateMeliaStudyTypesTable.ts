import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateMeliaStudyTypesTable1652285692470
  implements MigrationInterface
{
  name = 'CreateMeliaStudyTypesTable1652285692470';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE clarisa_melia_study_types (
            id int NOT NULL AUTO_INCREMENT,
            name text NOT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
