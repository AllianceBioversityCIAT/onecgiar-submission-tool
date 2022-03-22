import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableTocsAddColumnWorkPackageId1646251440162 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        ALTER TABLE tocs ADD COLUMN work_package_id int(11) DEFAULT NULL
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
