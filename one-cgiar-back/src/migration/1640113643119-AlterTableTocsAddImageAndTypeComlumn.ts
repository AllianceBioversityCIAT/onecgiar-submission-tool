import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableTocsAddImageAndTypeComlumn1640113643119
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('alter tocs table');

    await queryRunner.query(`
                            ALTER TABLE tocs ADD COLUMN diagram TEXT DEFAULT NULL
                        `);

    await queryRunner.query(`
        ALTER TABLE tocs ADD COLUMN type tinyint(2) DEFAULT NULL
    `);

    await queryRunner.query(`
    ALTER TABLE tocs ADD COLUMN active tinyint(2) NOT NULL DEFAULT 1
`);

await queryRunner.query(`
ALTER TABLE tocs ADD COLUMN toc_id TEXT NOT NULL
`);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
