import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateMeliaStudiesActivitiesTable1648130890058
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Add melia_studies_activities');
    await queryRunner.query(`
                        CREATE TABLE melia_studies_activities (
                            id int(11) NOT NULL AUTO_INCREMENT,
                            initvStgId int(11) NOT NULL,
                            type_melia  TEXT DEFAULT NULL,
                            result_title TEXT DEFAULT NULL,
                            anticipated_year_completion TEXT DEFAULT NULL,
                            co_delivery TEXT DEFAULT NULL,
                            management_decisions_learning TEXT DEFAULT NULL,
                            active tinyint(2) NOT NULL DEFAULT 1,
                            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            KEY IDX_13546541175780921_initvStgId (initvStgId),
                            PRIMARY KEY (id),
                            CONSTRAINT FK_845588899475asd45583_initiatives_by_stages FOREIGN KEY (initvStgId) REFERENCES initiatives_by_stages (id) ON DELETE CASCADE               
                        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
                    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
