import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRiskAssessmentTable1637175755642 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create risk assessment table')
        await queryRunner.query(`
        CREATE TABLE risk_assessment (
            id int(11) NOT NULL AUTO_INCREMENT,
            risks_achieving_impact TEXT DEFAULT NULL,
            description_risk TEXT DEFAULT NULL,
            likelihood int(11) DEFAULT NULL,
            impact int(11) DEFAULT NULL,
            risk_score int(11) DEFAULT NULL,
            manage_plan_risk_id int(11) NOT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411ee98857_manage_plan_risk_id (manage_plan_risk_id),
            PRIMARY KEY (id),
            CONSTRAINT FK_844589899492qhd456729_manage_plan_risk_id FOREIGN KEY (manage_plan_risk_id) REFERENCES manage_plan_risk (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
