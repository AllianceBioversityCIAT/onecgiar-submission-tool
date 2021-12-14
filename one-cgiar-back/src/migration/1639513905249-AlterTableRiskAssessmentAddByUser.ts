import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableRiskAssessmentAddByUser1639513905249 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('alter risk assessment table');

        await queryRunner.query(`
                        ALTER TABLE risk_assessment ADD COLUMN add_by_user tinyint(2) NOT NULL DEFAULT 0
                    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
