import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableClarisaInstitutions1633271637639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('Add column institutionTypeId');
        await queryRunner.query(`
        ALTER TABLE clarisa_institutions
        ADD COLUMN institutionTypeId int(11) DEFAULT NULL
        `);

        console.log('Add column institutionType');
        await queryRunner.query(`
        ALTER TABLE clarisa_institutions
        ADD COLUMN institutionType TEXT DEFAULT NULL
        `);

        console.log('remove autoincrement');
        await queryRunner.query(`
        ALTER TABLE clarisa_institutions
        MODIFY COLUMN id int(11) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
