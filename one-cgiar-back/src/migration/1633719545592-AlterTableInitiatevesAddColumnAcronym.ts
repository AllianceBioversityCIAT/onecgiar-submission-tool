import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableInitiatevesAddColumnAcronym1633719545592
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE initiatives
        ADD COLUMN acronym TEXT NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
