import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterKeyPartnersTable1613662679513 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('Alter key_partners remove/update cols');
        await queryRunner.query(`ALTER TABLE key_partners DROP FOREIGN KEY FK_8b4c2233d99492cca2d96_initv_stages;`);
        await queryRunner.query(`ALTER TABLE key_partners DROP COLUMN comparative_advantage;`);
        await queryRunner.query(`ALTER TABLE key_partners DROP COLUMN initvStgId;`);
        await queryRunner.query(`ALTER TABLE key_partners RENAME COLUMN toc_description TO description;`);
        await queryRunner.query(`ALTER TABLE key_partners ADD COLUMN partnershipsId INT(11) DEFAULT NULL;`);
        await queryRunner.query(`ALTER TABLE key_partners ADD CONSTRAINT FK_845588899492cca2d96_partnershipsId FOREIGN KEY (partnershipsId) REFERENCES partnerships (id) ON DELETE CASCADE;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
