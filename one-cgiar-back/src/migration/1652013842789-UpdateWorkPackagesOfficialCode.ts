import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateWorkPackagesOfficialCode1652013842789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
       UPDATE work_packages set wp_official_code = id
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
