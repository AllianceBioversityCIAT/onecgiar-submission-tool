import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Stages } from "../entity/Stages";
import { StagesMeta } from "../entity/StagesMeta";
import { logger } from "../handlers/Logger";

export class AddStageConceptMetaData1614965884584 implements MigrationInterface {

    name = 'AddStageConceptMetaData1614965884584'
    public async up(queryRunner: QueryRunner): Promise<void> {

        const metaRepo = getRepository(StagesMeta);
        const cpnt = await getRepository(Stages).findOne({ where: { description: 'Concept' } });

        const cpnctMeta = metaRepo.create([
            {
                stage_name: cpnt.description,
                stage: cpnt,
                active: true,
                visible: true,
                order: 1,
                col_name: 'name',
                display_name: 'Initiative name',
                group_by: 'General Information'
            },
            {
                stage_name: cpnt.description,
                stage: cpnt,
                active: true,
                visible: true,
                order: 2,
                col_name: 'challenge',
                display_name: 'Challenge statement',
                group_by: 'Narratives'
            },
            {
                stage_name: cpnt.description,
                stage: cpnt,
                active: true,
                visible: true,
                order: 2,
                col_name: 'objectives',
                display_name: 'Measurable objectives',
                group_by: 'Narratives'
            },
            {
                stage_name: cpnt.description,
                stage: cpnt,
                active: true,
                visible: true,
                order: 2,
                col_name: 'results',
                display_name: 'Results',
                group_by: 'Narratives'
            },
            {
                stage_name: cpnt.description,
                stage: cpnt,
                active: true,
                visible: true,
                order: 2,
                col_name: 'highlights',
                display_name: 'Highlights',
                group_by: 'Narratives'
            },
            {
                stage_name: cpnt.description,
                stage: cpnt,
                active: true,
                visible: true,
                order: 1,
                col_name: 'action_area_description',
                display_name: 'Primary CGIAR Action Area',
                group_by: 'General Information'
            },
            {
                stage_name: cpnt.description,
                stage: cpnt,
                active: true,
                visible: false,
                order: 4,
                col_name: 'work_packages',
                display_name: 'Work packages',
                group_by: 'Work packages'
            },
            {
                stage_name: cpnt.description,
                stage: cpnt,
                active: true,
                visible: false,
                col_name: 'tocs',
                order: 3,
                display_name: 'Initial theory of change',
                group_by: 'Initial theory of change'
            },
            {
                stage_name: cpnt.description,
                stage: cpnt,
                active: true,
                visible: false,
                order: 5,
                col_name: 'key_partners',
                display_name: 'Key partners',
                group_by: 'Key partners'
            },
            {
                stage_name: cpnt.description,
                stage: cpnt,
                active: true,
                visible: false,
                col_name: 'action_area_id',
            },
            {
                stage_name: cpnt.description,
                stage: cpnt,
                active: true,
                visible: false,
                col_name: 'initvStgId',
            },
            {
                stage_name: cpnt.description,
                stage: cpnt,
                active: true,
                visible: false,
                col_name: 'id',
            },
        ])


        let conceptMeta = await metaRepo.save(cpnctMeta);
        logger.info('Concept meta migration runned', conceptMeta)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
