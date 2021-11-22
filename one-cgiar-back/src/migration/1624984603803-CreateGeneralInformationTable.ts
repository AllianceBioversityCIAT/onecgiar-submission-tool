import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateGeneralInformationTable1624984603803
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create general_information table');
    await queryRunner.query(`
        CREATE TABLE general_information (
            id int(11) NOT NULL AUTO_INCREMENT,
            name TEXT DEFAULT NULL,
            initvStgId int(11) NOT NULL,
            action_area_description varchar(500) COLLATE utf8_bin NOT NULL,
            action_area_id int(11) NOT NULL,

            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_1354654117589921_initvStgId (initvStgId),
            PRIMARY KEY (id),
            CONSTRAINT FK_845588899492cca883_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
