import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateActionAreasOutcomesTable1635944886892 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create sbt action areas outcomes table')
        await queryRunner.query(`
        CREATE TABLE sbt_action_areas_outcomes (
            id int(11) NOT NULL AUTO_INCREMENT,
            outcomes_id int(11) NOT NULL,
            outcomes_statement TEXT DEFAULT NULL,
            result_framework_id int(11) NOT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411ee88857_result_framework_id (result_framework_id),
            PRIMARY KEY (id),
            CONSTRAINT FK_845589899492qhd456729_result_framework_id FOREIGN KEY (result_framework_id) REFERENCES results_framework (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
