import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableFiles1631560612222 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('Add column meliaId');
        await queryRunner.query(`
        ALTER TABLE files
        ADD COLUMN meliaId int(11) DEFAULT NULL
        `);

        console.log('Add column manage_plan_risk_id');
        await queryRunner.query(`
        ALTER TABLE files
        ADD COLUMN manage_plan_risk_id int(11) DEFAULT NULL
        `);

        console.log('Add column humanId');
        await queryRunner.query(`
        ALTER TABLE files
        ADD COLUMN humanId int(11) DEFAULT NULL
        `);

        console.log('Add column finacial resources id');
        await queryRunner.query(`
        ALTER TABLE files
        ADD COLUMN financial_resources_id int(11) DEFAULT NULL
        `);

        console.log('Add column section');
        await queryRunner.query(`
        ALTER TABLE files
        ADD COLUMN section varchar(200) DEFAULT NULL
        `);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
