import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDepthScalesTable1631105909374 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create Depth Scales table')
        await queryRunner.query(`
        CREATE TABLE depth_scales (
            id int(11) NOT NULL AUTO_INCREMENT,
            impactIndicatorId  int(11) NOT NULL,
            name varchar(100) DEFAULT NULL,     
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411zz89956_impactIndicatorId (impactIndicatorId),
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
