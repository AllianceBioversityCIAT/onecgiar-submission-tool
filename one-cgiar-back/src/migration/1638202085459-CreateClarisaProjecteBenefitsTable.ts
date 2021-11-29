import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateClarisaProjecteBenefitsTable1638202085459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('create Clarisa Projected Benefits table');
        await queryRunner.query(`
            CREATE TABLE clarisa_projected_benefits (
                id int(11) NOT NULL,
                impactAreaName TEXT DEFAULT NULL,
                impactAreaIndicator int(11) NOT NULL,
                impactAreaIndicatorName TEXT DEFAULT NULL,
                isApplicableProjectedBenefits BOOLEAN DEFAULT NULL,
                targetYear int(15) NOT NULL,
                targetUnit TEXT DEFAULT NULL,
                value TEXT DEFAULT NULL,
                depthScales JSON DEFAULT NULL,
                weightingValues JSON DEFAULT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
