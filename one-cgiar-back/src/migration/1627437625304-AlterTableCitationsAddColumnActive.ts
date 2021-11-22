import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableCitationsAddColumnActive1627437625304
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Add active column to citations table');
    await queryRunner.query(`
            ALTER TABLE citations
            ADD COLUMN active tinyint(2) NOT NULL DEFAULT 1
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
