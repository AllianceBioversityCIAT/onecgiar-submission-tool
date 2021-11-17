import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableProjectedBenefitsAddColunmDepthName1634737687389 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        ALTER TABLE projection_benefits
        ADD COLUMN depth_scale_name TEXT DEFAULT NULL
        `);

        await queryRunner.query(`
        ALTER TABLE projection_benefits
        ADD COLUMN probability_name TEXT DEFAULT NULL
        `);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
