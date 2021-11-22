import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableIntiativesAddColumnOfficialCode1632150449571
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE initiatives
        ADD COLUMN official_code TEXT NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
