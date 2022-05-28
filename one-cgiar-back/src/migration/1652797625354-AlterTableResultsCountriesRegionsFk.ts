import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableResultsCountriesRegionsFk1652797625354
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE results_countries DROP FOREIGN KEY fk_countries_by_initiative_by_stage_init_wp_out_indicators1;
         `);

    await queryRunner.query(`
         ALTER TABLE results_countries ADD CONSTRAINT fk_countries_by_initiative_by_stage_init_wp_out_indicators1 FOREIGN KEY (results_id) REFERENCES results(id) ON DELETE CASCADE ON UPDATE RESTRICT;
          `);

    await queryRunner.query(`
          ALTER TABLE results_regions DROP FOREIGN KEY fk_countries_by_initiative_by_stage_init_wp_out_indicators10;
           `);

    await queryRunner.query(`
           ALTER TABLE results_regions ADD CONSTRAINT fk_countries_by_initiative_by_stage_init_wp_out_indicators10 FOREIGN KEY (results_id) REFERENCES results(id) ON DELETE CASCADE ON UPDATE RESTRICT;
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
