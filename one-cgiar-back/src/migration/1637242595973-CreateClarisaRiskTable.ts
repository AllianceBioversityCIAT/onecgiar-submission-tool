import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateClarisaRiskTable1637242595973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Add clarisa risks');
    await queryRunner.query(`
            CREATE TABLE clarisa_risks (
                id int(11) NOT NULL,
                generic_risks TEXT DEFAULT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)               
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
