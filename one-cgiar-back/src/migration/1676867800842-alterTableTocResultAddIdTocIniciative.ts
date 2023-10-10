import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableTocResultAddIdTocIniciative1676867800842 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE toc_results
            ADD id_toc_initiative text;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
