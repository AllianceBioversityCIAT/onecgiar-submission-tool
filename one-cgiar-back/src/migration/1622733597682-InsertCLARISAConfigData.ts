import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertCLARISAConfigData1622733597682 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Insert in sbt_config')
        await queryRunner.query(`
        INSERT INTO sbt_config (name, type, value, is_json )
        VALUES ('global_unit', 'clarisa', 'ONECGIAR', false);
       
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
