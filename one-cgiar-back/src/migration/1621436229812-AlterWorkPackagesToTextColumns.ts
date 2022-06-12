import {MigrationInterface, QueryRunner} from 'typeorm';

// 1621451356424
// --- 1621436229812
export class AlterWorkPackagesToTextColumns1621436229812
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Alter work_packages');
    await queryRunner.query(
      `ALTER TABLE work_packages MODIFY COLUMN results TEXT DEFAULT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE work_packages MODIFY COLUMN pathway_content TEXT DEFAULT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
