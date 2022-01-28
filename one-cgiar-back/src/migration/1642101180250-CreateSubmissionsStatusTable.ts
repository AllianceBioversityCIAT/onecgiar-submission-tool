import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateSubmissionsStatusTable1642101180250
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('create submissions status table');
    await queryRunner.query(`
        CREATE TABLE submissions_status (
            id int(11) NOT NULL AUTO_INCREMENT,
            submissionId int(11) NOT NULL,
            status TEXT DEFAULT NULL,
            description TEXT DEFAULT NULL,
            userId int(11) NOT NULL,
            first_name TEXT DEFAULT NULL,
            last_name TEXT DEFAULT NULL,
            active tinyint(2) NOT NULL DEFAULT 1,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465411yy88989_submissionId (submissionId),
            PRIMARY KEY (id),
            CONSTRAINT FK_84557779949899ppp56700_submissions FOREIGN KEY (submissionId) REFERENCES submissions (id) ON DELETE CASCADE
            
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;   
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
