import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMeliaTable1631561243086 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create melia table')
        await queryRunner.query(`
        CREATE TABLE melia (
            id int(11) NOT NULL AUTO_INCREMENT,
            initvStgId int(11) NOT NULL,
            melia_plan TEXT DEFAULT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411ss89856_initvStgId (initvStgId),
            PRIMARY KEY (id),
            CONSTRAINT FK_845588899492qwd456789_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE,
            CONSTRAINT initiative_id UNIQUE (initvStgId)
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
