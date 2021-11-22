import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreatePartnershipsTable1613662373833
  implements MigrationInterface
{
  name = 'CreatePartnershipsTable1613662373833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Add parterships');
    await queryRunner.query(`
            CREATE TABLE partnerships (
                id int(11) NOT NULL AUTO_INCREMENT,
                initvStgId int(11) DEFAULT NULL,
                comparative_advantage varchar(1000) COLLATE utf8_bin NOT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_1354654117564321_initvStgId (initvStgId),
                PRIMARY KEY (id),
                CONSTRAINT FK_845588899492cca2d96_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
