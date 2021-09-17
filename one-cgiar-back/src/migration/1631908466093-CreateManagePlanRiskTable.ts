import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateManagePlanRiskTable1631908466093 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create management pland and risk assessment table')
        await queryRunner.query(`
        CREATE TABLE manage_plan_risk (
            id int(11) NOT NULL AUTO_INCREMENT,
            initvStgId int(11) NOT NULL,
            management_plan TEXT DEFAULT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411ss88925_initvStgId (initvStgId),
            PRIMARY KEY (id),
            CONSTRAINT FK_845588899492z7d456789_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE,
            CONSTRAINT initiative_id UNIQUE (initvStgId)
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
