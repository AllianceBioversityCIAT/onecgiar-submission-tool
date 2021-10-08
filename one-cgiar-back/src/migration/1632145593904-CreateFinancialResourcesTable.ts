import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFinancialResourcesTable1632145593904 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create financial resources table')
        await queryRunner.query(`
        CREATE TABLE financial_resources (
            id int(11) NOT NULL AUTO_INCREMENT,
            initvStgId int(11) NOT NULL,
            detailed_budget TEXT DEFAULT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411as77926_initvStgId (initvStgId),
            PRIMARY KEY (id),
            CONSTRAINT FK_845577799492z8d456799_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE,
            CONSTRAINT initiative_id UNIQUE (initvStgId)
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
