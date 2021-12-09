import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateClarisaImpactIndicatorTable1638196582202
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create Clarisa Impact Areas Indicators table');
    await queryRunner.query(`
        CREATE TABLE clarisa_impact_areas_indicators (
            id int(11) NOT NULL,
            indicatorStatement TEXT DEFAULT NULL,
            impactAreaId int(11) NOT NULL,
            impactAreaName TEXT DEFAULT NULL,
            targetYear int(15) NOT NULL,
            targetUnit TEXT DEFAULT NULL,
            value TEXT DEFAULT NULL,
            isAplicableProjectedBenefits BOOLEAN DEFAULT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
