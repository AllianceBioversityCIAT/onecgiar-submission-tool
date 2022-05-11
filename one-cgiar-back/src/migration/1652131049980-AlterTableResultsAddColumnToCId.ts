import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableResultsAddColumnToCId1652131049980
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE results ADD COLUMN toc_result_id TEXT DEFAULT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
