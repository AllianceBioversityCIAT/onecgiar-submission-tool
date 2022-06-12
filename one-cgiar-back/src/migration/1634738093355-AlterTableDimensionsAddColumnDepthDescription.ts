import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableDimensionsAddColumnDepthDescription1634738093355
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE dimensions
        ADD COLUMN depth_description TEXT DEFAULT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
