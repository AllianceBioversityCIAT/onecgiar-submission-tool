import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTocResultsCountries1675094352527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS toc_results_countries (
                toc_result_id VARCHAR(50) NOT NULL,
                clarisa_countries_id INT NOT NULL,
                is_active TINYINT NULL,
                PRIMARY KEY (toc_result_id, clarisa_countries_id),
                INDEX fk_toc_results_has_clarisa_countries_clarisa_countries1_idx (clarisa_countries_id ASC) VISIBLE,
                INDEX fk_toc_results_has_clarisa_countries_toc_results1_idx (toc_result_id ASC) VISIBLE,
                CONSTRAINT fk_toc_results_has_clarisa_countries_toc_results1
                  FOREIGN KEY (toc_result_id)
                  REFERENCES toc_results (toc_result_id)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION)
              ENGINE = InnoDB;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
