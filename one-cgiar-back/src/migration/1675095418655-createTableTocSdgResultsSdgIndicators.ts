import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTocSdgResultsSdgIndicators1675095418655 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS toc_sdg_results_sdg_indicators (
                sdg_toc_result_id VARCHAR(100) NOT NULL,
                sdg_indicator_id INT NULL,
                PRIMARY KEY (sdg_toc_result_id),
                CONSTRAINT fk_toc_sdg_results_sdg_indicators_toc_sdg_results1
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
