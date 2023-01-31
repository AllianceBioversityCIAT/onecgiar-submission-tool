import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTocActionAreaResults1675094009200 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS toc_action_area_results (
            toc_result_id VARCHAR(50) NOT NULL,
            action_areas_id INT NOT NULL,
            statement VARCHAR(1000) NULL,
            is_active TINYINT NULL,
            PRIMARY KEY (toc_result_id),
            INDEX fk_toc_action_area_results_clarisa_action_areas1_idx (action_areas_id ASC) VISIBLE,
            CONSTRAINT fk_toc_action_area_results_clarisa_action_areas1
              FOREIGN KEY (action_areas_id)
              REFERENCES clarisa_action_areas (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION)
          ENGINE = InnoDB;
          `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
