import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnIsActiveInTocImpactAreaGlobalTarget1675171342579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE toc_impact_area_results_global_targets
            ADD is_active tinyint;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
