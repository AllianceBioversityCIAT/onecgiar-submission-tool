import {MigrationInterface, QueryRunner} from "typeorm";

export class changeNamaTableProjectedProbabilities1657722023479 implements MigrationInterface {
    name = 'changeNamaTableProjectedProbabilities1657722023479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE projected_probabilities RENAME clarisa_projected_probabilities;");
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
