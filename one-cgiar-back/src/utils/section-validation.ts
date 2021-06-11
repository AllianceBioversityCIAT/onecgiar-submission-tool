import { getConnection, getRepository } from "typeorm";
import _ from "lodash";
import { error } from "console";
import { APIError, BaseError } from "../handlers/BaseError";
import { HttpStatusCode } from "../handlers/Constants";
import { Stages } from "../entity/Stages";
import { InitiativesByStages } from "../entity/InititativesByStages";
import { ConceptHandler } from "../handlers/ConceptController";
/**
 * 
 * @param initvStgId 
 * @param stageDescription 
 * @returns validatedSection
 */
export const validatedSection = async (initvStgId: number, stageDescription: string) => {
    let validatedSection: any;

    switch (stageDescription) {
        case 'concept':
            validatedSection = {
                general_information: false,
                narratives: false,
                initial_theory_of_change: false,
                work_packages: false,
                key_partners: false
            }

            // validate general information
            validatedSection.general_information = await generalInformationValidator(initvStgId);

            // validate narratives
            validatedSection.narratives = await narrativesValidator(initvStgId);

            // validate initial theory of change
            validatedSection.initial_theory_of_change = await tocsValidator(initvStgId);

            // validate work packages
            validatedSection.work_packages = await workPackagesValidator(initvStgId);

            // validate key partners
            validatedSection.key_partners = await keyPartnersValidator(initvStgId);
            break;

        default:
            throw new BaseError('validatedSection', 404, 'Stage not available', false);
            break;
    }

    return validatedSection;


}

export const forwardStage = async (replicationStagDsc: string, currentInitiativeId: string) => {

    try {

        switch (replicationStagDsc) {
            case 'full_proposal':
                // concept handler object 
                const conceptObj = new ConceptHandler(currentInitiativeId);
                const isComplete = await conceptObj.validateCompletness()
                // if missing concept data, throw error 
                if (isComplete) {
                    // get full proposal data
                    const fullProposal = await conceptObj.forwardStage();
                    return fullProposal
                } else
                    throw new BaseError('Replication Process', 404, 'Incomplete concept', false);
                break;

            default:
                break;
        }
    } catch (error) {
        throw new BaseError('Replication Process', 404, error.message, false)
    }
}

// export const forwardStage = async (currentInitvStg: InitiativesByStages, replicationStageId: number) => {
//     const initvStgRepo = getRepository(InitiativesByStages);
//     const stageRepo = getRepository(Stages);
//     const queryRunner = getConnection().createQueryRunner();
//     try {
//         // get replication stage from db 
//         const repStage = await stageRepo.findOne(replicationStageId);
//         // create initiative by stage for replica stage
//         let newInitvStg = new InitiativesByStages();
//         // replication / new stage 
//         newInitvStg.stage = repStage;
//         // current initiative 
//         newInitvStg.initiative = currentInitvStg.initiative;
//         // save initiative by stage 
//         // newInitvStg = await initvStgRepo.save(newInitvStg);

//         // get replication stage description
//         const rStageDsc = repStage.description.toLowerCase().split(' ').join('_')
//         switch (rStageDsc) {
//             case 'concept':

//                 break;
//             case 'full_proposal':
//                 // get concept stage metadata
//                 const conceptMeta = await queryRunner.query(`SELECT * FROM stages_meta WHERE stageId = (SELECT id FROM stages WHERE description = 'Concept')`);

//                 // group meta from stage
//                 let grouped = _.mapValues(_.groupBy(conceptMeta, 'group_by'),
//                     clist => clist.map(meta => _.omit(meta, 'group_by')));

//                 console.log(grouped['General Information']);

//                 break;

//             default:
//                 break;
//         }


//     } catch (error) {

//     }
// }


/**
 * 
   Section Validators
 */


// general information validator
const generalInformationValidator = async (initvStgId): Promise<boolean> => {
    const queryRunner = getConnection().createQueryRunner();

    // get concept info fields
    const gi_conceptInfo = await queryRunner.query(`SELECT name, action_area_id FROM concept_info WHERE initvStgId = ${initvStgId}`);
    // get lead initiative user
    const gi_lead = await queryRunner.query(`SELECT userId FROM initiatives_by_users WHERE initiativeId = (SELECT initiativeId FROM initiatives_by_stages WHERE id = ${initvStgId}) AND roleId = (SELECT id FROM roles WHERE acronym = 'SGD')`);
    // get co-lead initiative user
    const gi_colead = await queryRunner.query(`SELECT userId FROM initiatives_by_users WHERE initiativeId = (SELECT initiativeId FROM initiatives_by_stages WHERE id = ${initvStgId}) AND roleId = (SELECT id FROM roles WHERE acronym = 'PI')`);
    // validate if any field is empty or null
    return (gi_conceptInfo.length
        && gi_conceptInfo.every(item => item.name && item.action_area_id))
        && (gi_lead.length && gi_lead.every(item => item.userId))
        && (gi_colead.length && gi_colead.every(item => item.userId));
}

// narratives information validator
const narrativesValidator = async (initvStgId): Promise<boolean> => {
    const queryRunner = getConnection().createQueryRunner();
    // get concept info data
    const narr_conceptInfo = await queryRunner.query(`SELECT challenge, objectives, results, highlights FROM concept_info WHERE initvStgId = ${initvStgId}`);
    // validate if any field is empty or null
    return narr_conceptInfo.length
        && narr_conceptInfo.every(item => item.challenge && item.objectives && item.results && item.highlights);
}

// tocs information validator
const tocsValidator = async (initvStgId): Promise<boolean> => {
    const queryRunner = getConnection().createQueryRunner();
    // get tocs data
    const toc_tocs = await queryRunner.query(`SELECT id FROM tocs WHERE initvStgId = ${initvStgId}`);
    // get tocs files data
    const toc_files = await queryRunner.query(`SELECT id FROM files WHERE tocsId =(SELECT id FROM tocs WHERE initvStgId = ${initvStgId})`);

    // validate if any field is empty or null
    return (toc_tocs.length && toc_tocs.every(item => item.id))
        && (toc_files.length && toc_files.every(item => item.id));
}

// work packages information validator
const workPackagesValidator = async (initvStgId): Promise<boolean> => {
    const queryRunner = getConnection().createQueryRunner();
    // get work packages data
    const wp_workPackages = await queryRunner.query(`SELECT name, results, pathway_content, acronym FROM work_packages WHERE initvStgId = ${initvStgId} AND active = 1`);
    // get work packages regions data
    const wp_regions = await queryRunner.query(`SELECT region_id FROM regions_by_work_packages WHERE wrkPkgId = (SELECT id FROM work_packages WHERE initvStgId = ${initvStgId} AND active = 1 LIMIT 1)`);
    // get work packages countries data
    const wp_countries = await queryRunner.query(`SELECT country_id FROM countries_by_work_packages WHERE wrkPkgId = (SELECT id FROM work_packages WHERE initvStgId = ${initvStgId} AND active = 1 LIMIT 1)`);

    // validate if any field is empty or null
    return wp_workPackages.length
        && wp_workPackages.every(item => item.name)
        && wp_workPackages.every(item => item.results)
        && wp_workPackages.every(item => item.pathway_content)
        && wp_workPackages.every(item => item.acronym)
        && (wp_regions && wp_regions.every(item => item.region_id))
        && (wp_countries && wp_countries.every(item => item.country_id));
}


// key partners information validator
const keyPartnersValidator = async (initvStgId): Promise<boolean> => {
    const queryRunner = getConnection().createQueryRunner();
    // get key partners data
    const kp_keyPartners = await queryRunner.query(`SELECT key_partner_id, key_partner_name, description FROM key_partners WHERE partnershipsId =(SELECT id FROM partnerships WHERE initvStgId = ${initvStgId})`);
    return kp_keyPartners.length
        && (kp_keyPartners.every(item => item.key_partner_name)
            && kp_keyPartners.every(item => item.key_partner_id)
            && kp_keyPartners.every(item => item.description));
}