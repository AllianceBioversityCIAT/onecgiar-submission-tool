import {MigrationInterface, QueryRunner} from 'typeorm';

export class DeleteSbtTablesMelia1642449089659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            drop table IF EXISTS sbt_global_targets;
            `
    );

    await queryRunner.query(
      `
        drop table IF EXISTS sbt_action_areas_out_indicators;
              `
    );

    await queryRunner.query(
      `
        drop table IF EXISTS sbt_action_areas_outcomes;
                `
    );

    await queryRunner.query(
      `
        drop table IF EXISTS sbt_impact_indicators;
                `
    );

    await queryRunner.query(
      `
        drop table IF EXISTS sbt_sdg_targets;
                `
    );

    await queryRunner.query(
      `
        drop table IF EXISTS sbt_impact_areas;
                `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
