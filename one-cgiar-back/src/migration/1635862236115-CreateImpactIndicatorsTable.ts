import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateImpactIndicatorsTable1635862236115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create sbt impact indicators table')
        await queryRunner.query(`
        CREATE TABLE sbt_impact_indicators (
            id int(11) NOT NULL AUTO_INCREMENT,
            impact_indicator_id int(11) NOT NULL,
            impact_indicator_name TEXT DEFAULT NULL,
            sbt_impact_area_id int(11) NOT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_165465411ee89827_sbt_impact_area_id (sbt_impact_area_id),
            PRIMARY KEY (id),
            CONSTRAINT FK_845588899492khd456829_sbt_impact_area_id FOREIGN KEY (sbt_impact_area_id) REFERENCES sbt_impact_areas (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
