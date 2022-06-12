import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterConceptInfo1617037390943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Alter table concept_info');
    await queryRunner.query(
      `ALTER TABLE concept_info MODIFY challenge TEXT DEFAULT NULL;`
    );
    await queryRunner.query(
      `ALTER TABLE concept_info MODIFY objectives TEXT DEFAULT NULL;`
    );
    await queryRunner.query(
      `ALTER TABLE concept_info MODIFY results TEXT DEFAULT NULL;`
    );
    await queryRunner.query(
      `ALTER TABLE concept_info MODIFY highlights TEXT DEFAULT NULL;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
