import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableCitationsAddColumnTableNameColName1627332241892
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Add table_name and col_name column to citations table');
    await queryRunner.query(`
            ALTER TABLE citations
            ADD COLUMN table_name TEXT DEFAULT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE citations
            ADD COLUMN col_name TEXT DEFAULT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
