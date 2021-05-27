import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableProjectionBenefitsTextColumns1621886812088 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Alter projection_benefits')
        await queryRunner.query(`ALTER TABLE projection_benefits MODIFY impact_area_indicator_name TEXT`);
        await queryRunner.query(`ALTER TABLE projection_benefits MODIFY impact_area_name TEXT`);
        await queryRunner.query(`ALTER TABLE projection_benefits MODIFY notes TEXT`);
        await queryRunner.query(`ALTER TABLE projection_benefits MODIFY impact_area_indicator_id int(11) DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE projection_benefits MODIFY impact_area_id int(11) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
