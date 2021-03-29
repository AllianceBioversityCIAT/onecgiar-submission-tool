import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTOC1617044660531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Alter table tocs')
        await queryRunner.query(`ALTER TABLE tocs MODIFY narrative TEXT DEFAULT NULL;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
