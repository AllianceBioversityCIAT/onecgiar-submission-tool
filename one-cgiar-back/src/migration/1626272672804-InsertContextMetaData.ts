import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Stages } from "../entity/Stages";
import { StagesMeta } from "../entity/StagesMeta";

export class InsertContextMetaData1626272672804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const stageRepo = getRepository(Stages);
        const stageMetaRepo = getRepository(StagesMeta);
        const fullPposal = await stageRepo.findOne({ where: { description: 'Full Proposal' } });

        const contextMeta = stageMetaRepo.create([
            {
                group_by: 'Context',
                order: 1,
                col_name: 'id',
                table_name: 'context',
                display_name: null,
                stage_name: null,
                active: true,
                visible: true,
                stage: null
            },
            {
                group_by: 'Context',
                order: 0,
                col_name: 'initvStgId',
                table_name: 'initiatives_by_stages',
                display_name: null,
                stage_name: null,
                active: true,
                visible: false,
                stage: null
            },
            {
                group_by: 'Context',
                order: 1,
                col_name: 'challenge_statement',
                table_name: 'context',
                display_name: 'Challenge Statement',
                stage_name: fullPposal.description,
                active: true,
                visible: true,
                stage: fullPposal
            },
            {
                group_by: 'Context',
                order: 2,
                col_name: 'smart_objectives',
                table_name: 'context',
                display_name: 'Measurable three-year (End of Initiative) outcomes',
                stage_name: fullPposal.description,
                active: true,
                visible: true,
                stage: fullPposal
            },
            {
                group_by: 'Context',
                order: 3,
                col_name: 'key_learnings',
                table_name: 'context',
                display_name: 'Learning from prior evaluations and Impact Assessments (IA)',
                stage_name: fullPposal.description,
                active: true,
                visible: true,
                stage: fullPposal
            },
            {
                group_by: 'Context',
                order: 4,
                col_name: 'priority_setting',
                table_name: 'context',
                display_name: 'Priority-setting',
                stage_name: fullPposal.description,
                active: true,
                visible: true,
                stage: fullPposal
            },
            {
                group_by: 'Context',
                order: 5,
                col_name: 'comparative_advantage',
                table_name: 'context',
                display_name: 'Comparative Advantage',
                stage_name: fullPposal.description,
                active: true,
                visible: true,
                stage: fullPposal
            },
            {
                group_by: 'Context',
                order: 6,
                col_name: 'participatory_design',
                table_name: 'context',
                display_name: 'Participatory design process',
                stage_name: fullPposal.description,
                active: true,
                visible: true,
                stage: fullPposal
            },
        ]);

        const res = await stageMetaRepo.save(contextMeta);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
