import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTocResultsSdgResults1675094742370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS toc_results_sdg_results (
                toc_result_id VARCHAR(50) NOT NULL,
                sdg_toc_result_id VARCHAR(50) NOT NULL,
                is_active TINYINT NULL,
                PRIMARY KEY (toc_result_id, sdg_toc_result_id),
                INDEX fk_toc_results_has_toc_sdg_results_toc_sdg_results1_idx (sdg_toc_result_id ASC) VISIBLE,
                INDEX fk_toc_results_has_toc_sdg_results_toc_results1_idx (toc_result_id ASC) VISIBLE,
                CONSTRAINT fk_toc_results_has_toc_sdg_results_toc_results1
                  FOREIGN KEY (toc_result_id)
                  REFERENCES toc_results (toc_result_id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION,
                CONSTRAINT fk_toc_results_has_toc_sdg_results_toc_sdg_results1
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
