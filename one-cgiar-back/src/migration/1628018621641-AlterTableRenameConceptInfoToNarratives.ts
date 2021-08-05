import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableRenameConceptInfoToNarratives1628018621641 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('Alter concept_info table to narratives');
        await queryRunner.query(`
            ALTER TABLE concept_info
            RENAME TO narratives
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
