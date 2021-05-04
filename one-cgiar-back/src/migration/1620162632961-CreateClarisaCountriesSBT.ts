import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateClarisaCountriesSBT1620162632961 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Add clarisa_countries');
        await queryRunner.query(`
            CREATE TABLE clarisa_countries (
                id int(11) NOT NULL AUTO_INCREMENT,
                code int(11) DEFAULT NULL,
                name TEXT DEFAULT NULL,
                isoAlpha2 TEXT DEFAULT NULL,
                data JSON DEFAULT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

                PRIMARY KEY (id)               
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
