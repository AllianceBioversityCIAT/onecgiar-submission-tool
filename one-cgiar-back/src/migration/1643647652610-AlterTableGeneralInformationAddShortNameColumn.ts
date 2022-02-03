import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableGeneralInformationAddShortNameColumn1643647652610
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE general_information ADD COLUMN acronym TEXT DEFAULT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
