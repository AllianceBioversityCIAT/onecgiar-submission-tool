import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePartnersTable1631303342624 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log('create partners table')

        await queryRunner.query(`
        CREATE TABLE partners (
            id int(11) NOT NULL AUTO_INCREMENT,
            impact_strategies_id int(11) NOT NULL,
            institutions_id int(11) DEFAULT NULL ,
            institutions_name varchar(200) DEFAULT NULL, 
            tag_id int(11) DEFAULT NULL,
            type_id int(11) NOT NULL,
            type_name varchar(200) NOT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411zz89956_impact_strategies_id (impact_strategies_id),
            PRIMARY KEY (id),
            CONSTRAINT FK_845588899492ascfhy454_impact_strategies FOREIGN KEY (impact_strategies_id) REFERENCES impact_strategies (id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
