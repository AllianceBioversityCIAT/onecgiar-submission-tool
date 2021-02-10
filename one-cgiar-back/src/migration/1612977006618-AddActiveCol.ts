import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActiveCol1612977006618 implements MigrationInterface {
    name = 'AddActiveCol1612977006618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('add ACTIVE to regions_by_work_packages table');
        await queryRunner.query(`ALTER TABLE regions_by_work_packages ADD COLUMN active tinyint(2) NOT NULL DEFAULT 1 AFTER id;`);
        console.log('add ACTIVE to projection_benefits table');
        await queryRunner.query(`ALTER TABLE projection_benefits ADD COLUMN active tinyint(2) NOT NULL DEFAULT 1 AFTER id;`);
        console.log('add ACTIVE to key_partners table');
        await queryRunner.query(`ALTER TABLE key_partners ADD COLUMN active tinyint(2) NOT NULL DEFAULT 1 AFTER id;`);
        console.log('add ACTIVE to countries_by_work_packages table');
        await queryRunner.query(`ALTER TABLE countries_by_work_packages ADD COLUMN active tinyint(2) NOT NULL DEFAULT 1 AFTER id;`);
        console.log('add ACTIVE to initiatives_by_users table');
        await queryRunner.query(`ALTER TABLE initiatives_by_users ADD COLUMN active tinyint(2) NOT NULL DEFAULT 1 AFTER id;`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
