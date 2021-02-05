import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTOCTables1612543534607 implements MigrationInterface {
    name = 'CreateTOCTables1612543534607'

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create regions_by_work_packages table');
        await queryRunner.query(`
            CREATE TABLE regions_by_work_packages (
                id int(11) NOT NULL AUTO_INCREMENT,
                wrkPkgId int(11) NOT NULL,
                region_id int(11) NOT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_1354654654564321_wrkPkgId (wrkPkgId),
                PRIMARY KEY (id),
                CONSTRAINT FK_8889955799492cca2d96_work_packages FOREIGN KEY (wrkPkgId) REFERENCES work_packages (id) ON DELETE CASCADE
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
