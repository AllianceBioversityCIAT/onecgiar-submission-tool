import {MigrationInterface, QueryRunner} from 'typeorm';

export class InsertRsultsTypes1652133137641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO results_types
        VALUES(3, 'EOI Outcome', 1, DEFAULT,DEFAULT);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
