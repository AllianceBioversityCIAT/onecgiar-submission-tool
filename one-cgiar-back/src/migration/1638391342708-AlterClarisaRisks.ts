import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterClarisaRisks1638391342708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('alter clarisa risks table');

    await queryRunner.query(`
                ALTER TABLE clarisa_risks ADD COLUMN clarisa_risks_theme_id int(11) DEFAULT NULL
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
