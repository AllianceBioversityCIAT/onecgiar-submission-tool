import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableInitvByStgAddRoleFK1617935439344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE initiatives_by_users ADD COLUMN roleId int(11) DEFAULT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
