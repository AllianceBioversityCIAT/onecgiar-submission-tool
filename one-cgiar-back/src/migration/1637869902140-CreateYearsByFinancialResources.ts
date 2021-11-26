import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateYearsByFinancialResources1637869902140
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create sbt years by financial resources table');

    await queryRunner.query(`
            ALTER TABLE financial_resources DROP COLUMN value 
        `);

    await queryRunner.query(`
            ALTER TABLE financial_resources DROP COLUMN year
        `);

    await queryRunner.query(`
        CREATE TABLE financial_resources_years (
            id int(11) NOT NULL AUTO_INCREMENT,
            value decimal(15,2) DEFAULT NULL,
            year VARCHAR(4) DEFAULT NULL,
            financialResourcesId int(11) NOT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY IDX_13546541ppp88957_financial_resources_id (financialResourcesId),
            CONSTRAINT financial_resources_years_ibfk_1 FOREIGN KEY (financialResourcesId) REFERENCES financial_resources (id)
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
