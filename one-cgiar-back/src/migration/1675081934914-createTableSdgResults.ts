import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableSdgResults1675081934914 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS toc_sdg_results (
                toc_result_id VARCHAR(50) NOT NULL,
                sdg_id INT NULL,
                sdg_contribution VARCHAR(100) NULL,
                is_active TINYINT NULL,
                PRIMARY KEY (toc_result_id))
              ENGINE = InnoDB;`
            )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
