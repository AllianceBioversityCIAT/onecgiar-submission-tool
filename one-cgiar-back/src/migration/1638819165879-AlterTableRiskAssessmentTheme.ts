import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableRiskAssessmentTheme1638819165879
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('alter Risk Assessment table fiel risks_theme');

    await queryRunner.query(`
                ALTER TABLE risk_assessment MODIFY risks_theme text DEFAULT NULL
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
