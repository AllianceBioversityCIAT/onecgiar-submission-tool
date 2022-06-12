import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateRegionsByMelia1653418022918 implements MigrationInterface {
  name = 'CreateRegionsByMelia1653418022918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE regions_by_melia_study (
            id int NOT NULL AUTO_INCREMENT,
            active tinyint NOT NULL DEFAULT 1,
            meliaStudyId int NOT NULL,
            initvStgId int NOT NULL,
            region_id int NOT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)) ENGINE=InnoDB`);
    await queryRunner.query(
      'ALTER TABLE `regions_by_melia_study` ADD CONSTRAINT `FK_9d684c910a05696227f6d21663b` FOREIGN KEY (`meliaStudyId`) REFERENCES `melia_studies_activities`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE `regions_by_melia_study` ADD CONSTRAINT `FK_b99e30d242f352f5cc29d6b13cf` FOREIGN KEY (`initvStgId`) REFERENCES `initiatives_by_stages`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
