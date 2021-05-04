import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableConceptInfoNullAsDefault1620146712995 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE concept_info MODIFY name TEXT`);
        await queryRunner.query(`ALTER TABLE concept_info MODIFY action_area_description TEXT`);
        await queryRunner.query(`ALTER TABLE concept_info MODIFY action_area_id int(11) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
