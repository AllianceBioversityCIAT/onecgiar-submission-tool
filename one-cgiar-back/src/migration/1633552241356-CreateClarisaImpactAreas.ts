import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateClarisaImpactAreas1633552241356
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create Clarisas Impact Areas table');
    await queryRunner.query(`
        CREATE TABLE clarisa_impact_areas (
            id int(11) NOT NULL,
            name TEXT DEFAULT NULL,
            description TEXT DEFAULT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
