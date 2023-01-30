import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTocSdgResultsSdgTargets1675082560957 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS toc_sdg_results_sdg_targets (
                sdg_toc_result_id VARCHAR(50) NOT NULL,
                sdg_target_id INT NOT NULL,
                is_active TINYINT NULL,
                PRIMARY KEY (sdg_toc_result_id, sdg_target_id),
                INDEX fk_toc_sdg_results_has_clarisa_sdg_targets_clarisa_sdg_targ_idx (sdg_target_id ASC) VISIBLE,
                INDEX fk_toc_sdg_results_has_clarisa_sdg_targets_toc_sdg_results1_idx (sdg_toc_result_id ASC) VISIBLE,
                CONSTRAINT fk_toc_sdg_results_has_clarisa_sdg_targets_toc_sdg_results1
                  FOREIGN KEY (sdg_toc_result_id)
                  REFERENCES toc_sdg_results (toc_result_id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION,
                CONSTRAINT fk_toc_sdg_results_has_clarisa_sdg_targets_clarisa_sdg_targets1
                  FOREIGN KEY (sdg_target_id)
                  REFERENCES clarisa_sdg_targets (id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION)
              ENGINE = InnoDB;`
            )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
