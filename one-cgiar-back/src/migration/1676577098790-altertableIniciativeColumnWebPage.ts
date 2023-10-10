import {MigrationInterface, QueryRunner} from "typeorm";

export class altertableIniciativeColumnWebPage1676577098790 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE initiatives
            ADD web_page text;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
