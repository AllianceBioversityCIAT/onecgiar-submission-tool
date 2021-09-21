import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePolicyComplianceOversightTable1632238241607 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create policy compliance oversight table')
        await queryRunner.query(`
        CREATE TABLE policy_compliance_oversight (
            id int(11) NOT NULL AUTO_INCREMENT,
            initvStgId int(11) NOT NULL,
            research_governance_policy tinyint(2) NOT NULL DEFAULT 0,
            open_fair_data_policy tinyint(2) NOT NULL DEFAULT 0,
            open_fair_data_details TEXT DEFAULT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411as77989_initvStgId (initvStgId),
            PRIMARY KEY (id),
            CONSTRAINT FK_845577799492z8d456700_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE,
            CONSTRAINT initiative_id UNIQUE (initvStgId)
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);



    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
