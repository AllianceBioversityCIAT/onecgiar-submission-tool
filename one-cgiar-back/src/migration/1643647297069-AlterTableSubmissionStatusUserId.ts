import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableSubmissionStatusUserId1643647297069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('alter submissions_status table');
        await queryRunner.query(`
        ALTER TABLE submissions_status MODIFY userId int(11) DEFAULT NULL;  
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
