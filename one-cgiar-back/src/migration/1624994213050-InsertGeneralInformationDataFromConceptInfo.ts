import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { GeneralInformation } from "../entity/GeneralInformation";

export class InsertGeneralInformationDataFromConceptInfo1624994213050 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // get concept information data
        const conceptInfo = await queryRunner.query(`SELECT name, action_area_description, action_area_id, initvStgId FROM concept_info`);

        // get general information repository
        const GIRepo = getRepository(GeneralInformation);

        conceptInfo.forEach(element => {
            element['initvStg'] = element['initvStgId'];
            delete element['initvStgId'];
            
        });
        // create general informations from concept infor
        const gnrInfos = GIRepo.create(conceptInfo);

        // save general informations 
        const gneralInformations = await GIRepo.save(gnrInfos);
        // console.log(gneralInformations);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
