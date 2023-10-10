import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnIsActiveInTocActionAreaOutcomeIndicator1675174110321 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE toc_action_area_results_outcomes_indicators
            ADD is_active tinyint;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
