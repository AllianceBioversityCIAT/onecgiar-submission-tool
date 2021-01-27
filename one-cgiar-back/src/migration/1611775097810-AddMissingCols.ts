import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMissingCols1611775097810 implements MigrationInterface {
    name = 'AddMissingColsToInitvStg1611775097810'

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('Add ACTIVE column to initiatives_by_stages table');
        await queryRunner.query(`
            ALTER TABLE initiatives_by_stages
            ADD COLUMN active tinyint(2) NOT NULL DEFAULT '0'
        `);
        
        console.log('Add STATUS column to initiatives_by_stages table');
        await queryRunner.query(`
            ALTER TABLE initiatives_by_stages
            ADD COLUMN status VARCHAR(255) NOT NULL DEFAULT 'Inactive'
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
