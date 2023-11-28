import {MigrationInterface, QueryRunner} from "typeorm";

export class riskAssessmentRiskId1658176740303 implements MigrationInterface {
    name = 'riskAssessmentRiskId1658176740303'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query("ALTER TABLE `risk_assessment` ADD `risk_id` int");

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query("ALTER TABLE `risk_assessment` DROP COLUMN `risk_id`");
        
    }

}
