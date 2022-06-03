import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterMeliaStudiesIsGlobal1653081174817
  implements MigrationInterface
{
  name = 'AlterMeliaStudiesIsGlobal1653081174817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `melia_studies_activities` ADD `is_global` tinyint NULL DEFAULT NULL after management_decisions_learning'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
