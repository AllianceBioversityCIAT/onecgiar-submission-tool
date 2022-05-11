import {MigrationInterface, QueryRunner} from 'typeorm';

export class alterTableWorkPackageAddColumnOffiCialCode1651863715850
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE work_packages ADD COLUMN wp_official_code int(11) DEFAULT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
