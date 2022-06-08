import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableResultsIndicatorsChangeFk1652797220733
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE results_indicators DROP FOREIGN KEY fk_indicators_init_wp_out_indicators1;
         `);

    await queryRunner.query(`
         ALTER TABLE results_indicators ADD CONSTRAINT fk_indicators_init_wp_out_indicators1 FOREIGN KEY (results_id) REFERENCES results(id) ON DELETE CASCADE ON UPDATE RESTRICT;
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
