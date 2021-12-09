import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateClarisaRegionsSBT1620163823619
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Add clarisa_regions');
    await queryRunner.query(`
            CREATE TABLE clarisa_regions (
                id int(11) NOT NULL AUTO_INCREMENT,
                code int(11) DEFAULT NULL,
                name TEXT DEFAULT NULL,
                parentRegionName TEXT DEFAULT NULL,
                parentRegionCode int(11) DEFAULT NULL,
                data JSON DEFAULT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

                PRIMARY KEY (id)               
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
