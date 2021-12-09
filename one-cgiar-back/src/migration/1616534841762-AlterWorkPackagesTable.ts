import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterWorkPackagesTable1616534841762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE work_packages MODIFY COLUMN name varchar(500) DEFAULT NULL;`
    );
    await queryRunner.query(
      `ALTER TABLE work_packages MODIFY COLUMN results varchar(1000) DEFAULT NULL;`
    );
    await queryRunner.query(
      `ALTER TABLE work_packages MODIFY COLUMN pathway_content varchar(1000) DEFAULT NULL;`
    );
    await queryRunner.query(
      `ALTER TABLE work_packages MODIFY COLUMN is_global tinyint(2) DEFAULT NULL;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
