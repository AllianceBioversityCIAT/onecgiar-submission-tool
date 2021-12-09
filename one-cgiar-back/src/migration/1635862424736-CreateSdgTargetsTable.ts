import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateSdgTargetsTable1635862424736 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create sbt sdg targets table');
    await queryRunner.query(`
        CREATE TABLE sbt_sdg_targets (
            id int(11) NOT NULL AUTO_INCREMENT,
            sdg_target_id int(11) NOT NULL,
            sdg_target_code TEXT DEFAULT NULL,
            sdg_target_target TEXT DEFAULT NULL,
            sbt_impact_area_id int(11) NOT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_165465411ef89827_sbt_impact_area_id (sbt_impact_area_id),
            PRIMARY KEY (id),
            CONSTRAINT FK_845588899492khs456829_sbt_impact_area_id FOREIGN KEY (sbt_impact_area_id) REFERENCES sbt_impact_areas (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
