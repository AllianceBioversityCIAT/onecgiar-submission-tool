import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTocImpactAreaResults1675094115977 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS toc_impact_area_results (
            toc_result_id VARCHAR(50) NOT NULL,
            impact_area_id INT NOT NULL,
            outcome_statement text NULL,
            is_active TINYINT NULL,
            PRIMARY KEY (toc_result_id),
            INDEX fk_toc_impact_area_results_clarisa_impact_areas1_idx (impact_area_id ASC) VISIBLE,
            CONSTRAINT fk_toc_impact_area_results_clarisa_impact_areas1
              FOREIGN KEY (impact_area_id)
              REFERENCES clarisa_impact_areas (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION)
          ENGINE = InnoDB;
          `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
