import {MigrationInterface, QueryRunner} from 'typeorm';

export class AlterTableStageMetaAddColumnSubsectionId1628084449611
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Add subsectionId column to stages_meta table');
    await queryRunner.query(`
            ALTER TABLE stages_meta
            ADD COLUMN subsectionId int(11) DEFAULT NULL,
            ADD KEY IDX_1354654466464328_subsectionId (subsectionId),
            ADD CONSTRAINT FK_84558889466492cca2c98_subsections FOREIGN KEY (subsectionId) REFERENCES subsections_meta (id) ON DELETE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
