import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateImpactStrategiesTable1631302300384 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create impact strategies table')
        
        await queryRunner.query(`
        CREATE TABLE impact_strategies (
            id int(11) NOT NULL AUTO_INCREMENT,
            initvStgId int(11) NOT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            challenge_priorization TEXT DEFAULT NULL,
            research_questions TEXT DEFAULT NULL,
            component_work_package TEXT DEFAULT NULL,
            performance_results TEXT DEFAULT NULL,
            human_capacity TEXT DEFAULT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_13546541175898892_initvStgId (initvStgId),
            PRIMARY KEY (id),
            CONSTRAINT FK_845588899492ascfgg454_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
