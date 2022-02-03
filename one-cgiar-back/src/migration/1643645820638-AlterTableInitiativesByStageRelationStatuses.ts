import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableInitiativesByStageRelationStatuses1643645820638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('alter initiatives_by_stages table');
        await queryRunner.query(`
        ALTER TABLE initiatives_by_stages RENAME COLUMN status TO statusId;  
        `);
        await queryRunner.query(`
        ALTER TABLE initiatives_by_stages MODIFY statusId int(11);  
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
