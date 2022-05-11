import {MigrationInterface, QueryRunner, getConnection} from "typeorm";

export class InsertMeliaStudyTypes1652287230573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getConnection()
      .createQueryBuilder()
      .insert()
      .into('clarisa_melia_study_types')
      .values([
        {
          name: 'Ex-ante, baseline and/or foresight study',
        },
        {
          name: 'Adoption or diffusion studies addressing learning questions on the TOC',
        },
        {
          name: 'Scaling readiness assessment',
        },
        {
          name: 'Tracing of scaling activities, as base for long-term, large scale impact studies ',
        },
        {
          name: 'Causal Impact Assessment learning studies',
        },
        {
          name: 'Program/project evaluation or review',
        },
        {
          name: 'Qualitative outcome study',
        },
        {
          name: 'Other MELIA activity'
        }
      ])
      .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
