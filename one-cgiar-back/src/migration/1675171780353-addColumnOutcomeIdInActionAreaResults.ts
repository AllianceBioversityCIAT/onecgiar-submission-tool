import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnOutcomeIdInActionAreaResults1675171780353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE toc_action_area_results
            ADD outcome_id int;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
