import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableSubmissionStatus1643129797987
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
       ALTER TABLE submissions_status RENAME COLUMN status TO statusId;  
        `);
    await queryRunner.query(`
       ALTER TABLE submissions_status MODIFY statusId int(11);  
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
