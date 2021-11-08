import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTablePartnersAddColunmsForTags1636387538952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        ALTER TABLE partners
        ADD COLUMN demand tinyint(2) DEFAULT 0
        `);

        await queryRunner.query(`
        ALTER TABLE partners
        ADD COLUMN innovation tinyint(2) DEFAULT 0
        `);

        await queryRunner.query(`
        ALTER TABLE partners
        ADD COLUMN scaling tinyint(2) DEFAULT 0
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
