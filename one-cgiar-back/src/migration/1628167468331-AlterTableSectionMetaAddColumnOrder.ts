import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableSectionMetaAddColumnOrder1628167468331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Add order column to sections_meta table');
        await queryRunner.query(` 
        ALTER TABLE sections_meta
        ADD COLUMN orderSection int(11) NOT NULL DEFAULT 0
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
