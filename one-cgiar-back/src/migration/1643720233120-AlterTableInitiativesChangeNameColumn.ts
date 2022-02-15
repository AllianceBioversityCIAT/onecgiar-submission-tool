import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableInitiativesChangeNameColumn1643720233120
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE initiatives MODIFY name text
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
