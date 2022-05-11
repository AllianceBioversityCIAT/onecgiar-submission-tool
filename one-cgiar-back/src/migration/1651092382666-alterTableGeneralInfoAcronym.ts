import {MigrationInterface, QueryRunner} from 'typeorm';

export class alterTableGeneralInfoAcronym1651092382666
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE general_information MODIFY COLUMN acronym  TEXT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
