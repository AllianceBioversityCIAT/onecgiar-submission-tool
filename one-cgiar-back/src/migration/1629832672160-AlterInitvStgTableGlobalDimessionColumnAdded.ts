import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterInitvStgTableGlobalDimessionColumnAdded1620664266932 implements MigrationInterface {

    name = "AlterInitvStgTableGlobalDimessionColumnAdded1620664266932";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE initiatives_by_stages
        ADD COLUMN global_dimension tinyint(2) NOT NULL DEFAULT 0
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
