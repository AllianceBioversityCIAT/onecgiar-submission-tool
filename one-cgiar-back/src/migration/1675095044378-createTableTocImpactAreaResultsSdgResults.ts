import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTocImpactAreaResultsSdgResults1675095044378 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS toc_impact_area_results_sdg_results (
                impact_area_toc_result_id VARCHAR(50) NOT NULL,
                sdg_toc_result_id VARCHAR(50) NOT NULL,
                is_active TINYINT NULL,
                PRIMARY KEY (impact_area_toc_result_id, sdg_toc_result_id),
                INDEX fk_toc_impact_area_results_has_toc_sdg_results_toc_sdg_resu_idx (sdg_toc_result_id ASC) VISIBLE,
                INDEX fk_toc_impact_area_results_has_toc_sdg_results_toc_impact_a_idx (impact_area_toc_result_id ASC) VISIBLE,
                CONSTRAINT fk_toc_impact_area_results_has_toc_sdg_results_toc_impact_are1
                  FOREIGN KEY (impact_area_toc_result_id)
                  REFERENCES toc_impact_area_results (toc_result_id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION,
                CONSTRAINT fk_toc_impact_area_results_has_toc_sdg_results_toc_sdg_results1
                  FOREIGN KEY (sdg_toc_result_id)
                  REFERENCES toc_sdg_results (toc_result_id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION)
              ENGINE = InnoDB;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
