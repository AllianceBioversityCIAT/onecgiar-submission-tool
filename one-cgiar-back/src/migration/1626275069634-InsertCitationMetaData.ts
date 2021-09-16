import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Stages } from "../entity/Stages";
import { StagesMeta } from "../entity/StagesMeta";

export class InsertCitationMetaData1626275069634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const stageRepo = getRepository(Stages);
        const stageMetaRepo = getRepository(StagesMeta);
        const fullPposal = await stageRepo.findOne({ where: { description: 'Full Proposal' } });

        const citationsMeta = stageMetaRepo.create([
            {
                group_by: 'Citations',
                order: 1,
                col_name: 'id',
                table_name: 'citations',
                display_name: null,
                stage_name: null,
                active: true,
                visible: false,
                stage: null
            },
            {
                group_by: 'Citations',
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
                group_by: 'Citations',
                order: 1,
                col_name: 'title',
                table_name: 'citations',
                display_name: 'Citation',
                stage_name: fullPposal.description,
                active: true,
                visible: true,
                stage: fullPposal
            },
            {
                group_by: 'Citations',
                order: 1,
                col_name: 'link',
                table_name: 'citations',
                display_name: 'Link',
                stage_name: fullPposal.description,
                active: true,
                visible: true,
                stage: fullPposal
            },
        ]);

        const res = await stageMetaRepo.save(citationsMeta);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
