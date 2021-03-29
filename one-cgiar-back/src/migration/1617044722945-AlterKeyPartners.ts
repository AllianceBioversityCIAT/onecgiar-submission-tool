import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterKeyPartners1617044722945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Alter table key_partners')
        await queryRunner.query(`ALTER TABLE key_partners MODIFY description TEXT DEFAULT NULL;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
