import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCitationsTable1626274944166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('create citations table')
        await queryRunner.query(`
        CREATE TABLE citations (
            id int(11) NOT NULL AUTO_INCREMENT,
            initvStgId int(11) NOT NULL,
            title TEXT DEFAULT NULL,
            link TEXT DEFAULT NULL,

            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411ss89921_initvStgId (initvStgId),
            PRIMARY KEY (id),
            CONSTRAINT FK_845588899492qwd45583_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
