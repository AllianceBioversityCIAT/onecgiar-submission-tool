import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { StagesMeta } from "../entity/StagesMeta";

export class InsertInitiativesListMetaData1625755016770 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const stageMetaRepo = getRepository(StagesMeta);

        const intiativesListMeta = stageMetaRepo.create([
            {
                group_by: 'Initiatives',
                order: 1,
                col_name: 'id',
                table_name: 'initiatives',
                display_name: null,
                stage_name: null,
                active: true,
                visible: true,
                stage: null
            },
            {
                group_by: 'Initiatives',
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
                group_by: 'Initiatives',
                order: 2,
                col_name: 'name',
                table_name: 'initiatives',
                display_name: 'Initiative Name',
                stage_name: null,
                active: true,
                visible: true,
                stage: null
            },
            {
                group_by: 'Initiatives',
                order: 3,
                col_name: 'status',
                table_name: 'initiatives_by_stages',
                display_name: 'Status',
                stage_name: null,
                active: true,
                visible: true,
                stage: null
            },
            {
                group_by: 'Initiatives',
                order: 4,
                col_name: 'action_area_description',
                table_name: 'general_information',
                display_name: 'CGIAR Action Area',
                stage_name: null,
                active: true,
                visible: true,
                stage: null
            },
            {
                group_by: 'Initiatives',
                order: 5,
                col_name: 'action_area_id',
                table_name: 'general_information',
                display_name: 'CGIAR Action Area',
                stage_name: null,
                active: true,
                visible: false,
                stage: null
            },
            {
                group_by: 'Initiatives',
                order: 6,
                col_name: 'description',
                table_name: 'stages',
                display_name: 'Current Stage',
                stage_name: null,
                active: true,
                visible: true,
                stage: null
            },
            {
                group_by: 'Initiatives',
                order: 0,
                col_name: 'active',
                table_name: 'initiatives_by_stages',
                display_name: 'Is active?',
                stage_name: null,
                active: true,
                visible: false,
                stage: null
            },
            {
                group_by: 'Initiatives',
                order: 0,
                col_name: 'stageId',
                table_name: 'initiatives_by_stages',
                display_name: 'Current Stage Id',
                stage_name: null,
                active: true,
                visible: false,
                stage: null
            },
            
        ]);

        const saved = await stageMetaRepo.save(intiativesListMeta);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
