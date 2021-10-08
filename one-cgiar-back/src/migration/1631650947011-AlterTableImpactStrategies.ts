import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableImpactStrategies1631650947011 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Add column impact_area_id');
        await queryRunner.query(`
        ALTER TABLE impact_strategies
        ADD COLUMN impact_area_id int(11) DEFAULT NULL
        `);

        console.log('Add column impact_area_name');
        await queryRunner.query(`
        ALTER TABLE impact_strategies
        ADD COLUMN impact_area_name TEXT DEFAULT NULL
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
