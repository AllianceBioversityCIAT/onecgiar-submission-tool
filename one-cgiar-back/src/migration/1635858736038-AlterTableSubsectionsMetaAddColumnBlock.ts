import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableSubsectionsMetaAddColumnBlock1635858736038
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE subsections_meta
        ADD COLUMN block TEXT DEFAULT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
