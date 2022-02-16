import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatTableResultTypes1644933894725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('create results types table');
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS results_types (
            id int(11) NOT NULL AUTO_INCREMENT,
            name TEXT DEFAULT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
        await queryRunner.query(`
        INSERT INTO results_types (name)
        VALUES ('Outcome'),   
            ('Output')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
