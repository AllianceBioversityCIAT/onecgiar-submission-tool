import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableKeyPartnersRemoveComparativeAdvantage1617207948143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Alter table key_partners')
        await queryRunner.query(`ALTER TABLE key_partners DROP COLUMN comparative_advantage;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
