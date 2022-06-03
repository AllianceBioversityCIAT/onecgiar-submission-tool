import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {MeliaStudiesActivities} from '../entity/MeliaStudiesActivities';
const studyTypes = [
  {id: 1, name: 'Ex-ante, baseline and/or foresight study'},
  {
    id: 2,
    name: 'Adoption or diffusion studies addressing learning questions on the TOC'
  },
  {id: 3, name: 'Scaling readiness assessment'},
  {
    id: 4,
    name: 'Tracing of scaling activities, as base for long-term, large scale impact studies'
  },
  {id: 5, name: 'Causal Impact Assessment learning studies'},
  {id: 6, name: 'Program/project evaluation or review'},
  {id: 7, name: 'Qualitative outcome study'},
  {id: 8, name: 'Other MELIA activity'}
];
export class MergeMELIAmigrations1653698138442 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `melia_studies_activities` ADD `other_melia` TEXT DEFAULT NULL'
    );
    await queryRunner.query(
      'ALTER TABLE `melia_studies_activities` ADD `type_melia_id` int after initvStgId'
    );

    const meliaRepository = await getRepository(MeliaStudiesActivities);

    const queryMelias = `SELECT id,
        initvStgId,
        type_melia
        FROM melia_studies_activities`;
    const allMeliaStudies: any = await queryRunner.query(queryMelias);

    console.log(studyTypes);
    try {
      if (allMeliaStudies.length > 0) {
        const updatedMeliaStudies: any[] = allMeliaStudies.map((melia) => {
          const newTypeMeliaId = studyTypes.find(
            (type) => type.name == melia.type_melia
          ).id;

          melia.type_melia_id = newTypeMeliaId;
          return melia;
        });

        await meliaRepository.save(updatedMeliaStudies);
      }
    } catch (error) {
      console.log(error);
    }

    await queryRunner.query(
      'ALTER TABLE `melia_studies_activities` DROP COLUMN `type_melia`'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
