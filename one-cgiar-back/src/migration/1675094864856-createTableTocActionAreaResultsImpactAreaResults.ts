import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTocActionAreaResultsImpactAreaResults1675094864856 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS toc_action_area_results_impact_area_results (
                action_area_toc_result_id VARCHAR(50) NOT NULL,
                impact_area_toc_result_id VARCHAR(50) NOT NULL,
                is_active TINYINT NULL,
                PRIMARY KEY (action_area_toc_result_id, impact_area_toc_result_id),
                INDEX fk_toc_action_area_results_has_toc_impact_area_results_toc__idx (impact_area_toc_result_id ASC) VISIBLE,
                INDEX fk_toc_action_area_results_has_toc_impact_area_results_toc__idx1 (action_area_toc_result_id ASC) VISIBLE,
                CONSTRAINT fk_toc_action_area_results_has_toc_impact_area_results_toc_ac1
                  FOREIGN KEY (action_area_toc_result_id)
                  REFERENCES toc_action_area_results (toc_result_id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION,
                CONSTRAINT fk_toc_action_area_results_has_toc_impact_area_results_toc_im1
                  FOREIGN KEY (impact_area_toc_result_id)
                  REFERENCES toc_impact_area_results (toc_result_id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION)
              ENGINE = InnoDB;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
