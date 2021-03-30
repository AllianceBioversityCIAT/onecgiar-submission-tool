import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterKeyPartners1617044722945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Alter table stages_meta')
        await queryRunner.query(`ALTER TABLE stages_meta ADD COLUMN table_name TEXT DEFAULT NULL AFTER col_name;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
