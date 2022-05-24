import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCountriesByMelia1653082324506 implements MigrationInterface {
    name = 'CreateCountriesByMelia1653082324506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE countries_by_melia_study ( id int NOT NULL AUTO_INCREMENT, 
            active tinyint NOT NULL DEFAULT 1,
            meliaStudyId int NOT NULL,
            initvStgId int NOT NULL,
            country_id int NOT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)) ENGINE=InnoDB`);
        await queryRunner.query("ALTER TABLE `countries_by_melia_study` ADD CONSTRAINT `FK_cacd8603d5e0654d15ec6ded90a` FOREIGN KEY (`meliaStudyId`) REFERENCES `melia_studies_activities`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `countries_by_melia_study` ADD CONSTRAINT `FK_0afb2cd666dfa2cb2819f833bf3` FOREIGN KEY (`initvStgId`) REFERENCES `initiatives_by_stages`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
