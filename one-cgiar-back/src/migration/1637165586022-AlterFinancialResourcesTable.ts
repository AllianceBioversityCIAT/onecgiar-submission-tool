import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterFinancialResourcesTable1637165586022
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('alter sbt financial resources table');

    await queryRunner.query(`
            ALTER TABLE financial_resources RENAME COLUMN detailed_budget TO financial_type
        `);

    await queryRunner.query(`
            ALTER TABLE financial_resources ADD COLUMN value decimal(15,2) DEFAULT NULL
        `);

    await queryRunner.query(`
            ALTER TABLE financial_resources ADD COLUMN year text DEFAULT NULL
        `);

    await queryRunner.query(`
            ALTER TABLE financial_resources ADD COLUMN financial_type_id int(11) DEFAULT NULL
        `);

    await queryRunner.query(`
            ALTER TABLE financial_resources ADD COLUMN table_name text DEFAULT NULL
        `);

    await queryRunner.query(`
            ALTER TABLE financial_resources ADD COLUMN col_name text DEFAULT NULL
        `);

    await queryRunner.query(`
            ALTER TABLE financial_resources DROP INDEX initiative_id
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
