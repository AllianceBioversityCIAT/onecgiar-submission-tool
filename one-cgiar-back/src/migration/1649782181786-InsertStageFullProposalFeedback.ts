import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertStageFullProposalFeedback1649782181786 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('Insert New Stage Full Proposal ISDC Feedback');
        await queryRunner.query(`
        INSERT INTO stages
        (id, description, active, start_date, end_date, created_at, updated_at)
        VALUES(4, 'Full Proposal ISDC Feedback', 1, NULL, NULL, '2022-04-12 11:54:52', '2022-04-12 11:54:52');
        `);
      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
