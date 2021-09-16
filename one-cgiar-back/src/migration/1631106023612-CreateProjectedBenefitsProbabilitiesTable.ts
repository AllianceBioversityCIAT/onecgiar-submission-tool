import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectedBenefitsProbabilitiesTable1631106023612 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create Projected benefits probabilities table')
        await queryRunner.query(`
        CREATE TABLE projected_probabilities (
            id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(100) DEFAULT NULL,
            description varchar(250) COLLATE utf8_bin DEFAULT NULL,          
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)           
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
