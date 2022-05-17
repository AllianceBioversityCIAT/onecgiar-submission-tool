import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableClarisaMeliaEstudyTypesRemoveAutoIncrement1652387234225
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE clarisa_melia_study_types MODIFY COLUMN id int NOT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
