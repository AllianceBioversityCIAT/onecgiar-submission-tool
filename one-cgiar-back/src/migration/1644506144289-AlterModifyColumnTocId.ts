import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterModifyColumnTocId1644506144289 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE tocs MODIFY toc_id text DEFAULT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
