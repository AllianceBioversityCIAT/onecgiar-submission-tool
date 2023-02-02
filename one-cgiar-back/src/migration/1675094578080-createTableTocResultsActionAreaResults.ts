import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTocResultsActionAreaResults1675094578080 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS toc_results_action_area_results (
                toc_result_id VARCHAR(50) NOT NULL,
                action_area_toc_result_id VARCHAR(50) NOT NULL,
                ìs_active TINYINT NULL,
                PRIMARY KEY (toc_result_id, action_area_toc_result_id),
                INDEX fk_toc_results_has_toc_action_area_results_toc_action_area__idx (action_area_toc_result_id ASC) VISIBLE,
                INDEX fk_toc_results_has_toc_action_area_results_toc_results1_idx (toc_result_id ASC) VISIBLE,
                CONSTRAINT fk_toc_results_has_toc_action_area_results_toc_results1
                  FOREIGN KEY (toc_result_id)
                  REFERENCES toc_results (toc_result_id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION,
                CONSTRAINT fk_toc_results_has_toc_action_area_results_toc_action_area_re1
                  FOREIGN KEY (action_area_toc_result_id)
                  REFERENCES toc_action_area_results (toc_result_id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION)
              ENGINE = InnoDB;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
