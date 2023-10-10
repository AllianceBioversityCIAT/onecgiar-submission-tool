import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTocImpactAreaResultsGlobalTargets1675095342964 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS toc_impact_area_results_global_targets (
                impact_area_toc_result_id VARCHAR(50) NOT NULL,
                global_target_id INT NOT NULL,
                PRIMARY KEY (impact_area_toc_result_id, global_target_id),
                INDEX fk_toc_impact_area_results_has_clarisa_global_targets_clari_idx (global_target_id ASC) VISIBLE,
                INDEX fk_toc_impact_area_results_has_clarisa_global_targets_toc_i_idx (impact_area_toc_result_id ASC) VISIBLE,
                CONSTRAINT fk_toc_impact_area_results_has_clarisa_global_targets_toc_imp1
                  FOREIGN KEY (impact_area_toc_result_id)
                  REFERENCES toc_impact_area_results (toc_result_id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION,
                CONSTRAINT fk_toc_impact_area_results_has_clarisa_global_targets_clarisa1
                  FOREIGN KEY (global_target_id)
                  REFERENCES clarisa_global_targets (id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION)
              ENGINE = InnoDB;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
