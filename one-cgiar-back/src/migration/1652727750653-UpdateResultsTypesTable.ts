import {MigrationInterface, QueryRunner} from 'typeorm';

export class UpdateResultsTypesTable1652727750653
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        UPDATE results_types set name = "Output"
         WHERE id = 1
         `);

    await queryRunner.query(`
         UPDATE results_types set name = "Outcome"
          WHERE id = 2
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
