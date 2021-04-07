import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateStatusColInitiativeByStageTable1617807312105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('alter STATUS column to initiatives_by_stages table');
        await queryRunner.query(`
            ALTER TABLE initiatives_by_stages
            MODIFY COLUMN status text
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
