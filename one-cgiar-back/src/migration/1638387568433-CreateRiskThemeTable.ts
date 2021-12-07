import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateRiskThemeTable1638387568433 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create clarisa risk theme table');
    await queryRunner.query(`
                CREATE TABLE clarisa_risk_theme (
                    id int(11) NOT NULL AUTO_INCREMENT,
                    risk_theme TEXT DEFAULT NULL,
                    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
                `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
