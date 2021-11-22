import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateTOCTables1612543534607 implements MigrationInterface {
  name = 'CreateTOCTables1612543534607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create tocs table');
    await queryRunner.query(`
            CREATE TABLE tocs (
                id int(11) NOT NULL AUTO_INCREMENT,
                initvStgId int(11) DEFAULT NULL,
                narrative varchar(1000) COLLATE utf8_bin NOT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_1354654654564321_initvStgId (initvStgId),
                PRIMARY KEY (id),
                CONSTRAINT FK_888955899492cca2d96_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);
    console.log('create files table');
    await queryRunner.query(`
            CREATE TABLE files (
                id int(11) NOT NULL AUTO_INCREMENT,
                tocsId int(11) DEFAULT NULL,
                url varchar(1000) COLLATE utf8_bin NOT NULL,
                name varchar(500) COLLATE utf8_bin NOT NULL,
                active tinyint(2) NOT NULL DEFAULT 0,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_13887744654564321_tocsId (tocsId),
                PRIMARY KEY (id),
                CONSTRAINT FK_888989894422cca2d96_tocsId FOREIGN KEY (tocsId) REFERENCES tocs (id) ON DELETE CASCADE
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
