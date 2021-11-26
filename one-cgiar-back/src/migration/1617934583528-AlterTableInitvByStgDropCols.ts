import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableInitvByStgDropCols1617934583528
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE initiatives_by_users 
            DROP COLUMN is_lead,
            DROP COLUMN is_owner,
            DROP COLUMN is_coordinator
            ;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
