import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateConfigTable1622732013487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('CREATE sbt_config');
    await queryRunner.query(`
        CREATE TABLE sbt_config (
            id int(11) NOT NULL AUTO_INCREMENT,
            name TEXT DEFAULT NULL,
            type TEXT DEFAULT NULL,
            value TEXT DEFAULT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            is_json tinyint(2) NOT NULL DEFAULT 0,
            start_date timestamp DEFAULT NULL,
            end_date timestamp DEFAULT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

            PRIMARY KEY (id)               
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
