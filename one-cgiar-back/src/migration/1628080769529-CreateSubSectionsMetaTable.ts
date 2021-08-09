import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSubSectionsMetaTable1628080769529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Add subsections_meta');
        let order_col = '`order` int(11) NOT NULL DEFAULT 0,'
        await queryRunner.query(`
            CREATE TABLE subsections_meta (
                id int(11) NOT NULL AUTO_INCREMENT,
                ${order_col} 
                description varchar(250) COLLATE utf8_bin DEFAULT NULL,              
                display_name varchar(250) COLLATE utf8_bin DEFAULT NULL,
                stage_name varchar(500) COLLATE utf8_bin DEFAULT NULL,
                active tinyint(2) NOT NULL DEFAULT 0,
                visible tinyint(2) NOT NULL DEFAULT 0,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                single_section tinyint(2) NOT NULL DEFAULT 0,
                sectionId int(11) DEFAULT NULL,
                KEY IDX_1354654466464323_sectionId (sectionId),
                PRIMARY KEY (id),
                CONSTRAINT FK_84558889466492cca2c95_sections FOREIGN KEY (sectionId) REFERENCES sections_meta (id) ON DELETE CASCADE
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
