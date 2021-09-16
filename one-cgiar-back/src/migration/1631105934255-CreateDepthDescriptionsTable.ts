import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDepthDescriptionsTable1631105934255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create Depth Descriptions table')
        await queryRunner.query(`
        CREATE TABLE depth_descriptions (
            id int(11) NOT NULL AUTO_INCREMENT,
            impactIndicatorId  int(11) NOT NULL,
            name varchar(100) DEFAULT NULL,     
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411aa89856_impactIndicatorId(impactIndicatorId),
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
