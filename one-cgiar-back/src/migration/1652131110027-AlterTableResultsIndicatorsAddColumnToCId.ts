import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableResultsIndicatorsAddColumnToCId1652131110027
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE results_indicators ADD COLUMN toc_result_indicator_id TEXT DEFAULT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
