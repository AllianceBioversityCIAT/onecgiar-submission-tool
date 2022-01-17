import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateModelMelia1642447558046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Add init_action_areas_out_indicators');
    await queryRunner.query(
      `
                    CREATE TABLE IF NOT EXISTS init_action_areas_out_indicators (
                        id INT NOT NULL AUTO_INCREMENT,
                        active TINYINT NOT NULL DEFAULT 1,
                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        initiatives_by_stages_id INT NOT NULL,
                        outcomes_indicators_id INT NULL,
                        init_action_areas_out_indicatorscol VARCHAR(45) NULL,
                        PRIMARY KEY (id),
                        INDEX fk_init_action_areas_out_indicators_initiatives_by_stages1_idx (initiatives_by_stages_id ASC) VISIBLE,
                        INDEX fk_outcomes_indicators_idx (outcomes_indicators_id ASC) VISIBLE,
                        CONSTRAINT fk_init_action_areas_out_indicators_initiatives_by_stages1
                          FOREIGN KEY (initiatives_by_stages_id)
                          REFERENCES initiatives_by_stages (id)
                          ON DELETE NO ACTION
                          ON UPDATE NO ACTION)
                      ENGINE = InnoDB
                      DEFAULT CHARACTER SET = utf8
                      COLLATE = utf8_bin;
                    `
    );

    await queryRunner.query(
      `
        CREATE TABLE IF NOT EXISTS init_impact_area_global_targets (
            id INT NOT NULL AUTO_INCREMENT,
            global_target_id INT NOT NULL,
            active TINYINT NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            initiatives_by_stages_id INT NOT NULL,
            PRIMARY KEY (id),
            INDEX fk_init_action_area_global_targets_initiatives_by_stages1_idx (initiatives_by_stages_id ASC) VISIBLE,
            INDEX fk_global_target_idx (global_target_id ASC) VISIBLE,
            CONSTRAINT fk_init_action_area_global_targets_initiatives_by_stages1
              FOREIGN KEY (initiatives_by_stages_id)
              REFERENCES initiatives_by_stages (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION)
          ENGINE = InnoDB
          DEFAULT CHARACTER SET = utf8
          COLLATE = utf8_bin;
        `
    );

    await queryRunner.query(
      `
        CREATE TABLE IF NOT EXISTS init_impact_area_impact_indicators (
            id INT NOT NULL AUTO_INCREMENT,
            impact_indicator_id INT NOT NULL,
            active TINYINT NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            initiatives_by_stages_id INT NOT NULL,
            PRIMARY KEY (id),
            INDEX fk_init_impact_area_impact_indicators_initiatives_by_stages_idx (initiatives_by_stages_id ASC) VISIBLE,
            INDEX fk_impact_indicator_idx (impact_indicator_id ASC) VISIBLE,
            CONSTRAINT fk_init_impact_area_impact_indicators_initiatives_by_stages1
              FOREIGN KEY (initiatives_by_stages_id)
              REFERENCES initiatives_by_stages (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION)
          ENGINE = InnoDB
          DEFAULT CHARACTER SET = utf8
          COLLATE = utf8_bin;
        `
    );

    await queryRunner.query(
      `    
       CREATE TABLE IF NOT EXISTS init_impact_area_sdg_targets (
            id INT NOT NULL AUTO_INCREMENT,
            sdg_target_id INT NOT NULL,
            active TINYINT NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            initiatives_by_stages_id INT NOT NULL,
            PRIMARY KEY (id),
            INDEX fk_init_impact_area_sdg_targets_initiatives_by_stages1_idx (initiatives_by_stages_id ASC) VISIBLE,
            INDEX fk_sdg_target_idx (sdg_target_id ASC) VISIBLE,
            CONSTRAINT fk_init_impact_area_sdg_targets_initiatives_by_stages1
              FOREIGN KEY (initiatives_by_stages_id)
              REFERENCES initiatives_by_stages (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION)
          ENGINE = InnoDB
          DEFAULT CHARACTER SET = utf8
          COLLATE = utf8_bin;
        
        `
    );

    await queryRunner.query(
      `
        CREATE TABLE IF NOT EXISTS results (
            id INT NOT NULL,
            result_type_id INT NULL,
            result_title TEXT NULL,
            is_global TINYINT NULL DEFAULT NULL,
            results_framework_id INT NOT NULL,
            initiatives_by_stages_id INT NOT NULL,
            PRIMARY KEY (id),
            INDEX fk_init_wp_out_indicators_initiatives_by_stages1_idx (initiatives_by_stages_id ASC) VISIBLE,
            CONSTRAINT fk_init_wp_out_indicators_initiatives_by_stages1
              FOREIGN KEY (initiatives_by_stages_id)
              REFERENCES initiatives_by_stages (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION)
          ENGINE = InnoDB;
        `
    );

    await queryRunner.query(
      `
        CREATE TABLE IF NOT EXISTS indicators (
            id INT NOT NULL,
            name TEXT NULL,
            unit_measurement TEXT NULL,
            results_id INT NOT NULL,
            active TINYINT NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NOT NULL,
            baseline_value TEXT NULL,
            baseline_year INT NULL,
            target_value TEXT NULL,
            target_year INT NULL,
            PRIMARY KEY (id),
            INDEX fk_indicators_init_wp_out_indicators1_idx (results_id ASC) VISIBLE,
            CONSTRAINT fk_indicators_init_wp_out_indicators1
              FOREIGN KEY (results_id)
              REFERENCES results (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION)
          ENGINE = InnoDB;
        `
    );

    await queryRunner.query(
      `
        CREATE TABLE IF NOT EXISTS data_management (
            id INT NOT NULL,
            data_source TEXT NULL,
            data_collection_method TEXT NULL,
            frequency_data_collection TEXT NULL,
            results_id INT NOT NULL,
            active TINYINT NOT NULL,
            created_at TIMESTAMP NOT NULL,
            update_at TIMESTAMP NOT NULL,
            PRIMARY KEY (id),
            INDEX fk_data_management_init_wp_out_indicators1_idx (results_id ASC) VISIBLE,
            CONSTRAINT fk_data_management_init_wp_out_indicators1
              FOREIGN KEY (results_id)
              REFERENCES results (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION)
          ENGINE = InnoDB;
        
        `
    );

    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS results_countries (
        id INT NOT NULL,
        active TINYINT NOT NULL DEFAULT 1,
        country_id INT NULL DEFAULT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        results_id INT NOT NULL,
        PRIMARY KEY (id),
        INDEX fk_countries_by_initiative_by_stage_init_wp_out_indicators1_idx (results_id ASC) VISIBLE,
        CONSTRAINT fk_countries_by_initiative_by_stage_init_wp_out_indicators1
          FOREIGN KEY (results_id)
          REFERENCES results (id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)
      ENGINE = InnoDB;
      
    `);

    await queryRunner.query(
      `
        CREATE TABLE IF NOT EXISTS results_regions (
            id INT NOT NULL,
            active TINYINT NOT NULL DEFAULT 1,
            region_id INT NULL DEFAULT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            results_id INT NOT NULL,
            PRIMARY KEY (id),
            INDEX fk_countries_by_initiative_by_stage_init_wp_out_indicators1_idx (results_id ASC) VISIBLE,
            CONSTRAINT fk_countries_by_initiative_by_stage_init_wp_out_indicators10
              FOREIGN KEY (results_id)
              REFERENCES results (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION)
          ENGINE = InnoDB;
        `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
