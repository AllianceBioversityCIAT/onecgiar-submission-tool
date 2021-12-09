import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateActionAreasOutcomesIndicatorsTable1635946232033
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create sbt action areas outcomes indicators table');
    await queryRunner.query(`
        CREATE TABLE sbt_action_areas_out_indicators (
            id int(11) NOT NULL AUTO_INCREMENT,
            outcomes_indicators_id int(11) NOT NULL,
            outcomes_indicators_statement TEXT DEFAULT NULL,
            action_areas_outcomes_id int(11) NOT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411ee88957_action_areas_outcomes_id (action_areas_outcomes_id),
            PRIMARY KEY (id),
            CONSTRAINT FK_845589899492qhd456829_action_areas_outcomes_id FOREIGN KEY (action_areas_outcomes_id) REFERENCES sbt_action_areas_outcomes (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
