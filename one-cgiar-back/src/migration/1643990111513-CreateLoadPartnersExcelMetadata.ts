import {MigrationInterface, QueryRunner} from 'typeorm';

//1643990111513
export class CreateLoadPartnersExcelMetadata1643990111513
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO excel_metadata(created_at, updated_at, id, excel_col, sbt_col, sbt_table) 
        VALUES (DEFAULT, DEFAULT, DEFAULT, 'Clarisa ID', 'institutions_id', 'partners')
    `);
    await queryRunner.query(`
        INSERT INTO excel_metadata(created_at, updated_at, id, excel_col, sbt_col, sbt_table) 
        VALUES (DEFAULT, DEFAULT, DEFAULT, 'Impact Area', 'impact_area_id', 'partners')
    `);
    await queryRunner.query(`
        INSERT INTO excel_metadata(created_at, updated_at, id, excel_col, sbt_col, sbt_table) 
        VALUES (DEFAULT, DEFAULT, DEFAULT, 'Scaling', 'scaling', 'partners')
    `);
    await queryRunner.query(`
        INSERT INTO excel_metadata(created_at, updated_at, id, excel_col, sbt_col, sbt_table) 
        VALUES (DEFAULT, DEFAULT, DEFAULT, 'Demand', 'demand', 'partners')
    `);
    await queryRunner.query(`
        INSERT INTO excel_metadata(created_at, updated_at, id, excel_col, sbt_col, sbt_table) 
        VALUES (DEFAULT, DEFAULT, DEFAULT, 'Innovation', 'innovation', 'partners')
    `);
    await queryRunner.query(`
        INSERT INTO excel_metadata(created_at, updated_at, id, excel_col, sbt_col, sbt_table) 
        VALUES (DEFAULT, DEFAULT, DEFAULT, 'Initiative ID', 'official_code', 'partners')
    `);
    await queryRunner.query(`
        INSERT INTO excel_metadata(created_at, updated_at, id, excel_col, sbt_col, sbt_table) 
        VALUES (DEFAULT, DEFAULT, DEFAULT, 'Initiative name', 'initiative_name', 'partners')
    `);
    await queryRunner.query(`
        INSERT INTO excel_metadata(created_at, updated_at, id, excel_col, sbt_col, sbt_table) 
        VALUES (DEFAULT, DEFAULT, DEFAULT, 'InitvStgId', 'initvStgId', 'partners')
    `);
    await queryRunner.query(`
        INSERT INTO excel_metadata(created_at, updated_at, id, excel_col, sbt_col, sbt_table) 
        VALUES (DEFAULT, DEFAULT, DEFAULT, 'ImpactStrategiesId', 'impact_strategies_id', 'partners')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
