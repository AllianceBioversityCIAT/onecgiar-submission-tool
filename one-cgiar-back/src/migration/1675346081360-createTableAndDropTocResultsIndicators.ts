import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableAndDropTocResultsIndicators1675346081360 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE toc_results_indicators;`)
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS toc_results_indicators (
            toc_result_indicator_id VARCHAR(50) NOT NULL,
            toc_result_id VARCHAR(50) NOT NULL,
            indicator_description text NULL,
            unit_messurament text NULL,
            type_value text NULL,
            baseline_value text NULL,
            baseline_date timestamp NULL,
            target_value text NULL,
            target_date timestamp NULL,
            data_colletion_source text NULL,
            data_collection_method text NULL,
            location text NULL,
            countries_id TEXT NULL,
            regions_id TEXT NULL,
            frequency_data_collection text NULL,
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
