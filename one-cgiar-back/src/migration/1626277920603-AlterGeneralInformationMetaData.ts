import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { StagesMeta } from "../entity/StagesMeta";

export class AlterGeneralInformationMetaData1626277920603 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const stageMetaRepo = getRepository(StagesMeta);
        const giMeta = await stageMetaRepo.find({ where: { group_by: 'General Information', table_name: 'concept_info' } });

        giMeta.forEach(gi => {
            gi.table_name = 'general_information'
        });


        const res = await stageMetaRepo.save(giMeta);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
