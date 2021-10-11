import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableClarisaInstitutionsTypes1633721939564 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create Clarisa institutions types table')
        await queryRunner.query(`
        CREATE TABLE clarisa_institutions_types (
            id int(11) NOT NULL,
            name TEXT DEFAULT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
