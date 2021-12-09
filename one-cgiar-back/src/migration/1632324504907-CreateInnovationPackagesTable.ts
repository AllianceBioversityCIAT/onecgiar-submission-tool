import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateInnovationPackagesTable1632324504907
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create innovation packages and scaling readniess plan table');
    await queryRunner.query(`
        CREATE TABLE innovation_packages (
            id int(11) NOT NULL AUTO_INCREMENT,
            initvStgId int(11) NOT NULL,
            key_principles TEXT DEFAULT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411zz77989_initvStgId (initvStgId),
            PRIMARY KEY (id),
            CONSTRAINT FK_84557779949ae8d456700_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE,
            CONSTRAINT initiative_id UNIQUE (initvStgId)
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
