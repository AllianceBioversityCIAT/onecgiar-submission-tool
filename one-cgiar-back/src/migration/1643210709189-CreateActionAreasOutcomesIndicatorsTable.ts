import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateActionAreasOutcomesIndicatorsTable1643210709189
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Add clarisa_action_areas_outcomes_indicators');
    await queryRunner.query(`
                    CREATE TABLE clarisa_action_areas_outcomes_indicators (
                        id int(11) NOT NULL,
                        action_area_id int(11) NOT NULL,
                        action_area_name TEXT DEFAULT NULL,
                        outcome_id int(11) NOT NULL,
                        outcome_smo_code TEXT DEFAULT NULL,
                        outcome_statement TEXT DEFAULT NULL,
                        outcome_indicator_id int(11) NOT NULL,
                        outcome_indicator_smo_code TEXT DEFAULT NULL,
                        outcome_indicator_statement TEXT DEFAULT NULL,
                        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        PRIMARY KEY (id)               
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
                `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
