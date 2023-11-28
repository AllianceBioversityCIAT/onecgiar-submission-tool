import {MigrationInterface, QueryRunner} from "typeorm";

export class refactorResultIndicators1665592550666 implements MigrationInterface {
    name = 'refactorResultIndicators1665592550666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE results_indicators MODIFY baseline_year text NULL");
        await queryRunner.query("ALTER TABLE results_indicators MODIFY target_year text NULL");
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
