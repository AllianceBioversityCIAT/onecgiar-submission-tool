import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateResultsNarrativesTable1645105442217
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Create results_narratives');
    await queryRunner.query(
      `
          CREATE TABLE IF NOT EXISTS results_narratives (
            id INT NOT NULL AUTO_INCREMENT,
            impact_area_contribution TEXT NULL,
            end_init_outcomes TEXT NULL,
            initvStgId INT NOT NULL,
            active TINYINT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            KEY IDX_135465421ss89856_initvStgId (initvStgId),
            PRIMARY KEY (id),
            CONSTRAINT FK_845588999492qwd45685_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE)
          ENGINE = InnoDB;
                        `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
