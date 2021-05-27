import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Stages } from "../entity/Stages";
import { StagesMeta } from "../entity/StagesMeta";

export class AlterInsertConceptStagesMetaData1621968182816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const stageMetaRepo = getRepository(StagesMeta);
        const stageRepo = getRepository(Stages);
        await queryRunner.query(`TRUNCATE stages_meta`);

        const concptStage = await stageRepo.findOne({ where: { active: true } });

        const conceptEntitiesMeta = stageMetaRepo.create([
            {
                group_by: 'General Information',
                order: 1,
                col_name: 'name',
                table_name: 'concept_info',
                display_name: 'Initiative Name',
                stage_name: concptStage.description,
                active: true,
                visible: true,
                stage: concptStage
            },
            {
                group_by: 'General Information',
                order: 1,
                col_name: 'action_area_description',
                table_name: 'concept_info',
                display_name: 'Primary CGIAR Action Area',
                stage_name: concptStage.description,
                active: true,
                visible: true,
                stage: concptStage
            },
            {
                group_by: 'General Information',
                order: 1,
                col_name: 'action_area_id',
                table_name: 'concept_info',
                display_name: null,
                stage_name: concptStage.description,
                active: true,
                visible: false,
                stage: concptStage
            },
            {
                group_by: 'General Information',
                order: 1,
                col_name: 'first_name',
                table_name: 'users',
                display_name: 'Lead Name',
                stage_name: concptStage.description,
                active: true,
                visible: false,
                stage: concptStage
            },
            {
                group_by: 'General Information',
                order: 1,
                col_name: 'email',
                table_name: 'users',
                display_name: 'Lead Email',
                stage_name: concptStage.description,
                active: true,
                visible: false,
                stage: concptStage
            },
            {
                group_by: 'General Information',
                order: 1,
                col_name: 'first_name',
                table_name: 'users',
                display_name: 'Co-Lead Name',
                stage_name: concptStage.description,
                active: true,
                visible: false,
                stage: concptStage
            },
            {
                group_by: 'General Information',
                order: 1,
                col_name: 'email',
                table_name: 'users',
                display_name: 'Co-Lead Email',
                stage_name: concptStage.description,
                active: true,
                visible: false,
                stage: concptStage
            },







            {
                group_by: 'Narratives',
                order: 2,
                col_name: 'challenge',
                table_name: 'concept_info',
                display_name: 'Challenge statement',
                stage_name: concptStage.description,
                active: true,
                visible: true,
                stage: concptStage
            },
            {
                group_by: 'Narratives',
                order: 2,
                col_name: 'objectives',
                table_name: 'concept_info',
                display_name: 'Measurable objectives',
                stage_name: concptStage.description,
                active: true,
                visible: true,
                stage: concptStage
            },
            {
                group_by: 'Narratives',
                order: 2,
                col_name: 'results',
                table_name: 'concept_info',
                display_name: 'Results',
                stage_name: concptStage.description,
                active: true,
                visible: true,
                stage: concptStage
            },
            {
                group_by: 'Narratives',
                order: 2,
                col_name: 'highlights',
                table_name: 'concept_info',
                display_name: 'Highlights',
                stage_name: concptStage.description,
                active: true,
                visible: true,
                stage: concptStage
            },










            {
                group_by: 'Initial theory of change',
                order: 3,
                col_name: 'narrative',
                table_name: 'tocs',
                display_name: 'Provide a narrative which explains further the TOC Diagram attached',
                stage_name: concptStage.description,
                active: true,
                visible: true,
                stage: concptStage
            },
            {
                group_by: 'Initial theory of change',
                order: 3,
                col_name: 'tocsId',
                table_name: 'files',
                display_name: null,
                stage_name: concptStage.description,
                active: true,
                visible: false,
                stage: concptStage
            },






            {
                group_by: 'Work Packages',
                order: 4,
                col_name: 'name',
                table_name: 'work_packages',
                display_name: 'Name',
                stage_name: concptStage.description,
                active: true,
                visible: true,
                stage: concptStage
            },
            {
                group_by: 'Work Packages',
                order: 4,
                col_name: 'results',
                table_name: 'work_packages',
                display_name: 'Reults',
                stage_name: concptStage.description,
                active: true,
                visible: true,
                stage: concptStage
            },
            {
                group_by: 'Work Packages',
                order: 4,
                col_name: 'pathway_content',
                table_name: 'work_packages',
                display_name: 'Ensure both science/research and innovation/impact pathway content',
                stage_name: concptStage.description,
                active: true,
                visible: true,
                stage: concptStage
            },
            {
                group_by: 'Work Packages',
                order: 4,
                col_name: 'acronym',
                table_name: 'work_packages',
                display_name: 'Acronym',
                stage_name: concptStage.description,
                active: true,
                visible: true,
                stage: concptStage
            },
            {
                group_by: 'Work Packages',
                order: 4,
                col_name: 'is_global',
                table_name: 'work_packages',
                display_name: 'Does the initiative have a global dimension?',
                stage_name: concptStage.description,
                active: true,
                visible: true,
                stage: concptStage
            },
            {
                group_by: 'Work Packages',
                order: 4,
                col_name: 'wrkPkgId',
                table_name: 'regions_by_work_packages',
                display_name: null,
                stage_name: concptStage.description,
                active: true,
                visible: false,
                stage: concptStage
            },
            {
                group_by: 'Work Packages',
                order: 4,
                col_name: 'region_id',
                table_name: 'regions_by_work_packages',
                display_name: null,
                stage_name: concptStage.description,
                active: true,
                visible: false,
                stage: concptStage
            },
            {
                group_by: 'Work Packages',
                order: 4,
                col_name: 'wrkPkgId',
                table_name: 'countries_by_work_packages',
                display_name: null,
                stage_name: concptStage.description,
                active: true,
                visible: false,
                stage: concptStage
            },
            {
                group_by: 'Work Packages',
                order: 4,
                col_name: 'country_id',
                table_name: 'countries_by_work_packages',
                display_name: null,
                stage_name: concptStage.description,
                active: true,
                visible: false,
                stage: concptStage
            },
        ]);

        let s = await stageMetaRepo.save(conceptEntitiesMeta);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
