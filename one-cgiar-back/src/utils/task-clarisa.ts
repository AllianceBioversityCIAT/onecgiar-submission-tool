import { getRepository } from "typeorm";
import { ClarisaInstitutions } from "../entity/ClarisaIntitutions";
import * as clarisa from '../controllers/Clarisa';
import { ClarisaImpactAreas } from "../entity/ClarisaImpactAreas";



/**CLARISA IMPACT AREAS*/

export async function deleteImpactAreas() {

    try {

        const clarisaImpactAreasRepo = getRepository(ClarisaImpactAreas);
        const clarisaImpactAreas = new ClarisaImpactAreas();
        const r = await clarisaImpactAreasRepo.delete(clarisaImpactAreas);
        console.log('2.delete clarisa impact areas');

    } catch (error) {

        console.log('deleteImpactAreas', error);

    }

}


export async function createImpactAreas() {

    console.log('1.start create impact areas');

    try {

        const clarisaImpactAreasRepo = getRepository(ClarisaImpactAreas);
        const impactAreas = await clarisa.getImpactAreas();

        if (impactAreas.length > 0) {

            await deleteImpactAreas();

            let impactAreasArray: ClarisaImpactAreas[] = [];
            let idTable = 0;

            for (let index = 0; index < impactAreas.length; index++) {
                const element = impactAreas[index];
                idTable = idTable + 1;
                let cla = clarisaImpactAreasRepo.create({
                    id: idTable,
                    name: element.name,
                    description: element.name,
                
                });
                impactAreasArray.push(cla)

            }

            const r = await clarisaImpactAreasRepo.save(impactAreasArray);

            console.log('3.end create impact areas');

        } else {
            console.log('Issues with Clarisa');

        }

    } catch (error) {

        console.log('createImpactAreas', error);

    }


}

/**CLARISA INSTITUTIONS*/

export async function deleteInstitutions() {

    try {

        const clarisaRepo = getRepository(ClarisaInstitutions);
        const clarisaInstitutions = new ClarisaInstitutions();
        const r = await clarisaRepo.delete(clarisaInstitutions);
        console.log('5.delete institutions');

    } catch (error) {

        console.log('deleteInstitutions', error);

    }

}

export async function createInstitutions() {

    console.log('4.start create institutions');

    try {

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

            console.log('6.end create institutions');

        } else {
            console.log('Issues with Clarisa');

        }

    } catch (error) {

        console.log('createInstitutions', error);

    }


}

