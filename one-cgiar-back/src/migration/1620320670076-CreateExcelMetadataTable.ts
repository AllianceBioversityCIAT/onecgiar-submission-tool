import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateExcelMetadataTable1620320670076
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Add excel_metadata');
    await queryRunner.query(`
            CREATE TABLE excel_metadata (
                id int(11) NOT NULL AUTO_INCREMENT,
                excel_col TEXT DEFAULT NULL,
                sbt_col TEXT DEFAULT NULL,
                sbt_table TEXT DEFAULT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

                PRIMARY KEY (id)               
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);

    await queryRunner.query(`
            INSERT INTO excel_metadata(created_at, updated_at, id, excel_col, sbt_col, sbt_table) 
            VALUES (DEFAULT, DEFAULT, DEFAULT, 'PCF001_InitName', 'name', 'initiatives')
        `);
    await queryRunner.query(`
            INSERT INTO excel_metadata(created_at, updated_at, id, excel_col, sbt_col, sbt_table) 
            VALUES (DEFAULT, DEFAULT, DEFAULT, 'PCF001_InitName', 'name', 'concept_info')
        `);
    await queryRunner.query(`
            INSERT INTO excel_metadata(created_at, updated_at, id, excel_col, sbt_col, sbt_table) 
            VALUES (DEFAULT, DEFAULT, DEFAULT, 'initiative_id', 'id', 'initiatives')
        `);
    await queryRunner.query(`
            INSERT INTO excel_metadata(created_at, updated_at, id, excel_col, sbt_col, sbt_table) 
            VALUES (DEFAULT, DEFAULT, DEFAULT, 'AA_Code', 'action_area_description', 'concept_info')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
