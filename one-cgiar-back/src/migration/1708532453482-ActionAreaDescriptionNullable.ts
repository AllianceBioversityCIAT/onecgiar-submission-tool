import {MigrationInterface, QueryRunner} from 'typeorm';

export class ActionAreaDescriptionNullable1708532453482
  implements MigrationInterface
{
  name = 'ActionAreaDescriptionNullable1708532453482';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `general_information` CHANGE `action_area_description` `action_area_description` varchar(500) NULL'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `general_information` CHANGE `action_area_description` `action_area_description` varchar(500) COLLATE "utf8mb3_bin" NOT NULL'
    );
  }
}
