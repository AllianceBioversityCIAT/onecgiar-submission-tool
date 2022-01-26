import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableResultsIndicatorsAddColumnsData1643230036715 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE results_indicators ADD COLUMN data_source TEXT DEFAULT NULL
        `);
        await queryRunner.query(`
        ALTER TABLE results_indicators ADD COLUMN data_collection_method TEXT DEFAULT NULL
        `);
        await queryRunner.query(`
        ALTER TABLE results_indicators ADD COLUMN frequency_data_collection TEXT DEFAULT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
