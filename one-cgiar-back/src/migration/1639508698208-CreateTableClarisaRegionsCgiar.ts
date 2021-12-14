import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableClarisaRegionsCgiar1639508698208 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('Add clarisa_region_cgiar');
        await queryRunner.query(`
                CREATE TABLE clarisa_regions_cgiar (
                    id int(11) NOT NULL,
                    name TEXT DEFAULT NULL,
                    acronym TEXT DEFAULT NULL,
                    countries JSON DEFAULT NULL,
                    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (id)               
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
            `);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
