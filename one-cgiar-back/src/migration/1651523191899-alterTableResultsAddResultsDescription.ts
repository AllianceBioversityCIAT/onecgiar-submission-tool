import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableResultsAddResultsDescription1651523191899 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE results ADD COLUMN result_description TEXT DEFAULT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
