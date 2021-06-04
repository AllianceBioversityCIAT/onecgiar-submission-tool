import { getRepository, Like, MigrationInterface, QueryRunner } from "typeorm";
import { Stages } from "../entity/Stages";
import { StagesMeta } from "../entity/StagesMeta";

export class InsertFullProposalGeneralInformationMetaData1622836927371 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const stageRepo = getRepository(Stages);
        const stageMetaRepo = getRepository(StagesMeta);
        const fullPStage = await stageRepo.findOne({ where: { description: Like('Full Proposal') } });

        const fullPGeneralInfoMeta = stageMetaRepo.create([
            {
                group_by: 'General Information',
                order: 1,
                col_name: 'name',
                table_name: 'concept_info',
                display_name: 'Initiative Name',
                stage_name: fullPStage.description,
                active: true,
                visible: true,
                stage: fullPStage
            },
            {
                group_by: 'General Information',
                order: 1,
                col_name: 'action_area_description',
                table_name: 'concept_info',
                display_name: 'Primary CGIAR Action Area',
                stage_name: fullPStage.description,
                active: true,
                visible: true,
                stage: fullPStage
            },
            {
                group_by: 'General Information',
                order: 1,
                col_name: 'action_area_id',
                table_name: 'concept_info',
                display_name: null,
                stage_name: fullPStage.description,
                active: true,
                visible: false,
                stage: fullPStage
            },
            {
                group_by: 'General Information',
                order: 1,
                col_name: 'first_name',
                table_name: 'users',
                display_name: 'Lead Name',
                stage_name: fullPStage.description,
                active: true,
                visible: false,
                stage: fullPStage
            },
            {
                group_by: 'General Information',
                order: 1,
                col_name: 'email',
                table_name: 'users',
                display_name: 'Lead Email',
                stage_name: fullPStage.description,
                active: true,
                visible: false,
                stage: fullPStage
            },
            {
                group_by: 'General Information',
                order: 1,
                col_name: 'first_name',
                table_name: 'users',
                display_name: 'Co-Lead Name',
                stage_name: fullPStage.description,
                active: true,
                visible: false,
                stage: fullPStage
            },
            {
                group_by: 'General Information',
                order: 1,
                col_name: 'email',
                table_name: 'users',
                display_name: 'Co-Lead Email',
                stage_name: fullPStage.description,
                active: true,
                visible: false,
                stage: fullPStage
            },

        ]);

        let s = await stageMetaRepo.save(fullPGeneralInfoMeta);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
