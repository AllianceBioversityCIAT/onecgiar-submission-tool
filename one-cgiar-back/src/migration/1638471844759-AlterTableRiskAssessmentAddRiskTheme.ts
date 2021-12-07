import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableRiskAssessmentAddRiskTheme1638471844759
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('alter risk assessment table');

    await queryRunner.query(`
                    ALTER TABLE risk_assessment ADD COLUMN risks_theme int(11) DEFAULT NULL
                `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
