import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableTocsAddWorkPackageColumn1640184758886
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE tocs ADD COLUMN work_package TEXT DEFAULT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
