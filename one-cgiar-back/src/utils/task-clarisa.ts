import { getRepository } from "typeorm";
import { ClarisaInstitutions } from "../entity/ClarisaIntitutions";
import * as clarisa from '../controllers/Clarisa';



export async function deleteInstitutions() {

    const clarisaRepo = getRepository(ClarisaInstitutions);
    const clarisaInstitutions = new ClarisaInstitutions();
    const r = await clarisaRepo.delete(clarisaInstitutions);
    console.log('delete institutions');


}


export async function createInstitutions() {

    console.log('start create institutions');

    const clarisaRepo = getRepository(ClarisaInstitutions);
    const institutions = await clarisa.getClaInstitutions();

    if (institutions.length > 0) {

        await deleteInstitutions();

        let institutionsArray: ClarisaInstitutions[] = [];
        let idTable = 0;

        for (let index = 0; index < institutions.length; index++) {
            const element = institutions[index];
            idTable = idTable + 1;
            let cla = clarisaRepo.create({
                id: idTable,
                acronym: element.acronym,
                code: element.code,
                country_name: '',
                name: element.name,
                data: element,
                institutionType: element.institutionType,
                institutionTypeId: element.institutionTypeId

            });
            institutionsArray.push(cla)

        }

        const r = await clarisaRepo.save(institutionsArray);

        console.log('end create institutions');

    }else{
        console.log('Issues with Clarisa');

    }

}
