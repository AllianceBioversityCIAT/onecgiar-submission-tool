import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableInitActionAreasOutIndicatiorsAddOutcomeId1652279019779
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE init_action_areas_out_indicators ADD COLUMN outcome_id int(11) DEFAULT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
