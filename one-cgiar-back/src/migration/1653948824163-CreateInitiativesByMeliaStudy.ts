import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateInitiativesByMeliaStudy1653948824163 implements MigrationInterface {
    name = 'CreateInitiativesByMeliaStudy1653948824163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE initiatives_by_melia_study (
            id int NOT NULL AUTO_INCREMENT,
            active tinyint NOT NULL,
            meliaStudyId int NOT NULL,
            initiativeId int NOT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE initiatives_by_melia_study ADD CONSTRAINT FK_1bbb43acf9303804e9c0c805bcc FOREIGN KEY (meliaStudyId) REFERENCES melia_studies_activities(id) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE initiatives_by_melia_study ADD CONSTRAINT FK_eb832a2cd4f7093cbf508626228 FOREIGN KEY (initiativeId) REFERENCES initiatives(id) ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
