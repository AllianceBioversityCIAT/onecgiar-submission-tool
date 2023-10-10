import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableAddColumnDateInInitiatives1676637974398 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE initiatives
            ADD start_date date;`
        )
        await queryRunner.query(
            `ALTER TABLE initiatives
            ADD end_date date;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
