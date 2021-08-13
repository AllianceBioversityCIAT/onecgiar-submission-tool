import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBudgetTable1628796306322 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create budget table')
        await queryRunner.query(`
        CREATE TABLE budget (
            id int(11) NOT NULL AUTO_INCREMENT,
            initvStgId int(11) NOT NULL,
            value DECIMAL(19,4) NOT NULL,
            table_name TEXT DEFAULT NULL,
            col_name TEXT DEFAULT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411ss89856_initvStgId (initvStgId),
            PRIMARY KEY (id),
            CONSTRAINT FK_845588899492qwd45685_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
