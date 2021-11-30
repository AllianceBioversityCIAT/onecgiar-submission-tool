import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateInitiativeTeamTable1638282297897
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create initiative team table');
    await queryRunner.query(`
            CREATE TABLE initiative_team (
                id int(11) NOT NULL AUTO_INCREMENT,
                category TEXT DEFAULT NULL,
                area_expertise TEXT DEFAULT NULL,
                key_accountabilities TEXT DEFAULT NULL,
                human_resources_id int(11) NOT NULL,
                active tinyint(2) NOT NULL DEFAULT 1,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                KEY IDX_135465411ee98858_human_resources_id (human_resources_id),
                PRIMARY KEY (id),
                CONSTRAINT FK_844589899492qht456729_human_resources_id FOREIGN KEY (human_resources_id) REFERENCES human_resources (id) ON DELETE CASCADE
                
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
