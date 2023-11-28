import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTocActionAreaResultsOutcomesIndicators1675095154401 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS toc_action_area_results_outcomes_indicators (
                action_area_toc_result_id VARCHAR(50) NOT NULL,
                action_area_outcome_indicator_id INT NOT NULL,
                PRIMARY KEY (action_area_toc_result_id, action_area_outcome_indicator_id),
                INDEX fk_toc_action_area_results_has_clarisa_action_areas_outcome_idx (action_area_outcome_indicator_id ASC) VISIBLE,
                INDEX fk_toc_action_area_results_has_clarisa_action_areas_outcome_idx1 (action_area_toc_result_id ASC) VISIBLE,
                CONSTRAINT fk_toc_action_area_results_has_clarisa_action_areas_outcomes_1
                  FOREIGN KEY (action_area_toc_result_id)
                  REFERENCES toc_action_area_results (toc_result_id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION,
                CONSTRAINT fk_toc_action_area_results_has_clarisa_action_areas_outcomes_2
                  FOREIGN KEY (action_area_outcome_indicator_id)
                  REFERENCES clarisa_action_areas_outcomes_indicators (id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION)
              ENGINE = InnoDB;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
