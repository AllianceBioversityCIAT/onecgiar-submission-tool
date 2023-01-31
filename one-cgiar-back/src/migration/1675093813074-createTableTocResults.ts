import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTocResults1675093813074 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS toc_results (
            toc_result_id VARCHAR(50) NOT NULL,
            result_type INT NULL,
            work_packages_id INT NOT NULL,
            result_title VARCHAR(500) NULL,
            result_description VARCHAR(1000) NULL,
            outcome_type VARCHAR(45) NULL,
            is_global TINYINT NULL,
            is_active TINYINT NULL,
            PRIMARY KEY (toc_result_id),
            INDEX fk_toc_outc_outp_results_work_packages1_idx (work_packages_id ASC) VISIBLE,
            CONSTRAINT fk_toc_outc_outp_results_work_packages1
              FOREIGN KEY (work_packages_id)
              REFERENCES work_packages (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION)
          ENGINE = InnoDB;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
