import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateTableInitiativesApproval1653665532444
  implements MigrationInterface
{
  name = 'CreateTableInitiativesApproval1653665532444';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE initiatives_approval (
            id int NOT NULL AUTO_INCREMENT,
            initiativeId int NOT NULL,
            user_id int NOT NULL,
            is_approved tinyint NOT NULL,
            disapproved_reason text,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)) ENGINE=InnoDB`);
    await queryRunner.query(
      'ALTER TABLE initiatives_approval ADD CONSTRAINT FK_7b478fe34037649efcb6380d546 FOREIGN KEY (initiativeId) REFERENCES initiatives(id) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE initiatives_approval ADD CONSTRAINT FK_c6a34db8b446336cb23718f700c FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
