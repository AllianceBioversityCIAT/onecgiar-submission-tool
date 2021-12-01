import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterRegionsCountriesFrgnKey1612469258892
  implements MigrationInterface
{
  name = 'AlterRegionsCountriesFrgnKey1612469258892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Alter region_id NULL available');
    await queryRunner.query(`
        ALTER TABLE regions_by_work_packages MODIFY COLUMN region_id int(11) DEFAULT NULL;
        `);
    console.log('Alter country_id NULL available');
    await queryRunner.query(`
            ALTER TABLE countries_by_work_packages MODIFY COLUMN country_id int(11) DEFAULT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
