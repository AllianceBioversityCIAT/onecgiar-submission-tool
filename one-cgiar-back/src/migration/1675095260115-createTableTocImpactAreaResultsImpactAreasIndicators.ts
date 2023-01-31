import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTocImpactAreaResultsImpactAreasIndicators1675095260115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS toc_impact_area_results_impact_areas_indicators (
                impact_area_toc_result_id VARCHAR(50) NOT NULL,
                impact_areas_indicators_id INT NOT NULL,
                is_active TINYINT NULL,
                PRIMARY KEY (impact_area_toc_result_id, impact_areas_indicators_id),
                INDEX fk_toc_impact_area_results_has_clarisa_impact_areas_indicat_idx (impact_areas_indicators_id ASC) VISIBLE,
                INDEX fk_toc_impact_area_results_has_clarisa_impact_areas_indicat_idx1 (impact_area_toc_result_id ASC) VISIBLE,
                CONSTRAINT fk_toc_impact_area_results_has_clarisa_impact_areas_indicator1
                  FOREIGN KEY (impact_area_toc_result_id)
                  REFERENCES toc_impact_area_results (toc_result_id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION,
                CONSTRAINT fk_toc_impact_area_results_has_clarisa_impact_areas_indicator2
                  FOREIGN KEY (impact_areas_indicators_id)
                  REFERENCES clarisa_impact_areas_indicators (id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION)
              ENGINE = InnoDB;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
