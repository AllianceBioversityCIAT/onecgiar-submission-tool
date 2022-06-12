import {MigrationInterface, QueryRunner} from 'typeorm';

export class aleterTableResulstsAddColumnWpId1651187531892
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE results ADD COLUMN work_package_id int(11) DEFAULT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
