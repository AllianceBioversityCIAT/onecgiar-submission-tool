import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterInitvStgTableGlobalDimessionColumnAdded1629832672160 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE initiatives_by_stages
        ADD COLUMN global_dimension tinyint(2) NOT NULL DEFAULT 0
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
