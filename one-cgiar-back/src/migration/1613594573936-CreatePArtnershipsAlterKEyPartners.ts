import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePArtnershipsAlterKEyPartners1613594573936 implements MigrationInterface {
    name = 'CreatePArtnershipsAlterKEyPartners1613594573936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Add parterships');
        await queryRunner.query(`
            CREATE TABLE partnerships (
                id int(11) NOT NULL AUTO_INCREMENT,
                initvStgId int(11) DEFAULT NULL,
                comparative_advantage varchar(1000) COLLATE utf8_bin NOT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_1354654117564321_initvStgId (initvStgId),
                PRIMARY KEY (id),
                CONSTRAINT FK_845588899492cca2d96_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);
        console.log('Alter key_partners remove/update cols');
        await queryRunner.query(`

        
        ALTER TABLE key_partners DROP COLUMN comparative_advantage;
        ALTER TABLE key_partners DROP FOREIGN KEY FK_8b4c2233d99492cca2d96_initv_stages;;
        ALTER TABLE key_partners DROP COLUMN initvStgId;
        
        ALTER TABLE key_partners RENAME COLUMN toc_description TO description;

        ALTER TABLE key_partners ADD COLUMN partnershipsId INT DEFAULT (11),
        ADD FOREIGN KEY FK_845588899492cca2d96_partnershipsId (
            partnershipsId
        ) REFERENCES partnerships (id) ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
