import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableContextAddActiveColumn1644336947096
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE context ADD COLUMN active tinyint(2) NOT NULL DEFAULT 1
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
