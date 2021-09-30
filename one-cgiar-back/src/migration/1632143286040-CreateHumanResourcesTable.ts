import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateHumanResourcesTable1632143286040 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create human resources table')
        await queryRunner.query(`
        CREATE TABLE human_resources (
            id int(11) NOT NULL AUTO_INCREMENT,
            initvStgId int(11) NOT NULL,
            gender_diversity_inclusion TEXT DEFAULT NULL,
            capacity_development TEXT DEFAULT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411as88926_initvStgId (initvStgId),
            PRIMARY KEY (id),
            CONSTRAINT FK_845588899492z8d456799_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE,
            CONSTRAINT initiative_id UNIQUE (initvStgId)
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
