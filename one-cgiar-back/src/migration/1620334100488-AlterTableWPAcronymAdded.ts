import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableWPAcronymAdded1620397182889 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Alter work_packages')
        await queryRunner.query(`ALTER TABLE work_packages ADD acronym TEXT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
