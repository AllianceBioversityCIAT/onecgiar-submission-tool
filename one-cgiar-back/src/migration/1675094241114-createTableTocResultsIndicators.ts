import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTocResultsIndicators1675094241114 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS toc_results_indicators (
            toc_result_indicator_id BIGINT NOT NULL,
            toc_result_id VARCHAR(50) NOT NULL,
            indicator_name VARCHAR(45) NULL,
            unit_messurament VARCHAR(45) NULL,
            baseline_value VARCHAR(45) NULL,
            baseline_year VARCHAR(45) NULL,
            target_value VARCHAR(45) NULL,
            target_year VARCHAR(45) NULL,
            data_source VARCHAR(45) NULL,
            data_collection VARCHAR(45) NULL,
            frequency_data_collection VARCHAR(45) NULL,
            is_active TINYINT NULL,
            PRIMARY KEY (toc_result_indicator_id),
            INDEX fk_toc_results_indicators_toc_results1_idx (toc_result_id ASC) VISIBLE,
            CONSTRAINT fk_toc_results_indicators_toc_results1
              FOREIGN KEY (toc_result_id)
              REFERENCES toc_results (toc_result_id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION)
          ENGINE = InnoDB;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
