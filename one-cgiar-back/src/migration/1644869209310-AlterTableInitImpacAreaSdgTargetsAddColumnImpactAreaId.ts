import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableInitImpacAreaSdgTargetsAddColumnImpactAreaId1644869209310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE init_impact_area_sdg_targets ADD COLUMN impact_area_id int(11) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
