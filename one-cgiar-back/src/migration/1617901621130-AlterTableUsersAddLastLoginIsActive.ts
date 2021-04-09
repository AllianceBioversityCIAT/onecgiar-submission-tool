import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableUsersAddLastLoginIsActive1617901621130 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE users 
            ADD COLUMN last_login timestamp NULL DEFAULT NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE users 
            ADD COLUMN is_active tinyint(1) NOT NULL DEFAULT '1';
        `);
        await queryRunner.query(`
            ALTER TABLE users 
            ADD COLUMN active_since timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
        `);
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
