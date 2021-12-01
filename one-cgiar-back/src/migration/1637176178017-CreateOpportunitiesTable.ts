import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateOpportunitiesTable1637176178017
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create Opportunities table');
    await queryRunner.query(`
        CREATE TABLE opportunities (
            id int(11) NOT NULL AUTO_INCREMENT,
            opportunities_description TEXT DEFAULT NULL,
            risk_assessment_id int(11) NOT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465461ee98857_risk_assessment_id (risk_assessment_id),
            PRIMARY KEY (id),
            CONSTRAINT FK_844589899495qhd456729_risk_assessment_id FOREIGN KEY (risk_assessment_id) REFERENCES risk_assessment (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
