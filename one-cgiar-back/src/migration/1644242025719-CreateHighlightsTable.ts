import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateHighlightsTable1644242025719 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE highlights (
            id int(11) NOT NULL AUTO_INCREMENT,
            initvStgId int(11) NOT NULL,
            name TEXT DEFAULT NULL,
            description TEXT DEFAULT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411ss84566_initvStgId (initvStgId),
            PRIMARY KEY (id),
            CONSTRAINT FK_845579899492qwd45685_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
