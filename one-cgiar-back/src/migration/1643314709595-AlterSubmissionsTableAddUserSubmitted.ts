import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterSubmissionsTableAddUserSubmitted1643314709595
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('alter submissions table');
    await queryRunner.query(`
        ALTER TABLE submissions RENAME COLUMN missing TO first_name;  
        `);
    await queryRunner.query(`
        ALTER TABLE submissions ADD COLUMN last_name text DEFAULT NULL;  
        `);
    await queryRunner.query(`
        ALTER TABLE submissions ADD COLUMN userId int(11) DEFAULT NULL;  
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
