import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateISDCResponsesTable1651001515693
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    //Create isdc_responses tables
    await queryRunner.query(`CREATE TABLE isdc_responses (
            id int NOT NULL AUTO_INCREMENT,
            initvStgId int NOT NULL,
            isdc_recommendation text NULL DEFAULT NULL,
            response text NULL DEFAULT NULL,
            updated_response text NULL DEFAULT NULL,
            is_deleted tinyint NOT NULL DEFAULT 0,
            user_id int NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)) ENGINE=InnoDB`);

    // Create foreign keys
    await queryRunner.query(
      'ALTER TABLE `isdc_responses` ADD CONSTRAINT `FK_84b84856c8aca9a371e53a47435` FOREIGN KEY (`initvStgId`) REFERENCES `initiatives_by_stages`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE `isdc_responses` ADD CONSTRAINT `FK_0fb9e46595d4be700017574afe0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
