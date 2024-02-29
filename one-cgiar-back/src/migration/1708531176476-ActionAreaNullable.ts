import {MigrationInterface, QueryRunner} from 'typeorm';

export class ActionAreaNullable1708531176476 implements MigrationInterface {
  name = 'ActionAreaNullable1708531176476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `general_information` CHANGE `action_area_id` `action_area_id` int NULL'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `general_information` CHANGE `action_area_id` `action_area_id` int NOT NULL'
    );
  }
}
