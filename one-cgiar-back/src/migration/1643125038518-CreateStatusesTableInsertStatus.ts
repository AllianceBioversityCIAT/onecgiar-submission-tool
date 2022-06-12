import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateStatusesTableInsertStatus1643125038518
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create status table');
    await queryRunner.query(`
        CREATE TABLE statuses (
            id int(11) NOT NULL AUTO_INCREMENT,
            icon TEXT DEFAULT NULL,
            status TEXT DEFAULT NULL,
            description TEXT DEFAULT NULL,
            rolesAvailables json DEFAULT NULL,
            stagesAvailables json DEFAULT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
    await queryRunner.query(`
        INSERT INTO statuses (status, description, rolesAvailables, stagesAvailables, icon)
        VALUES ('Pending','Initiative just submitted. Pending assessment', '[6]', '[1,2,3]', 'pending_actions'),   
            ('On hold','Initiative in assesment process.', '[6]', '[1,2,3]', 'pause_circle_filled'),   
            ('Steped up','Initiative moved forward in submission process.', '[6]', '[1,2]', 'fast_forward'),   
            ('Approved','Initiative approved for next stage in ONE CGIAR process.', '[6]', '[3]', 'check_circle')  
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
