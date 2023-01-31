import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnIsActiveInTocActionAreaImpactAreaResult1675174295435 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE toc_action_area_results_impact_area_results
            ADD is_active tinyint;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
