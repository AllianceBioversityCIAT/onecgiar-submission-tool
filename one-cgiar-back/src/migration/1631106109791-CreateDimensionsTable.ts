import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDimensionsTable1631106109791 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create dimensions table')
        await queryRunner.query(`
        CREATE TABLE dimensions (
            id int(11) NOT NULL AUTO_INCREMENT,
            projectionId int(11) NOT NULL,
            depthDescriptionId int(11) NOT NULL,
            breadth_value DECIMAL(19,2) NOT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411ss898572_projectionId (projectionId),
            KEY IDX_135465411ss898586_depthDescriptionId (depthDescriptionId),
            PRIMARY KEY (id),
            CONSTRAINT FK_845588899492qwd457893_projection_benefits FOREIGN KEY (projectionId) REFERENCES projection_benefits (id) ON DELETE CASCADE,
            CONSTRAINT FK_845588899492qwd457899_depth_descriptions FOREIGN KEY (depthDescriptionId) REFERENCES depth_descriptions (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
