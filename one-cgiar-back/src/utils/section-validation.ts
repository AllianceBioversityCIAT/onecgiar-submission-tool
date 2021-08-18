import _ from "lodash";
import { BaseError } from "../handlers/BaseError";
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
            // concept handler object 
            const conceptObj = new ConceptHandler(initvStgId.toString());
            const sectionsValidated = await conceptObj.validateSections();
            validatedSection = sectionsValidated;
            break;

        default:
            throw new BaseError('validatedSection', 400, 'Stage not available', false);
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
                const isComplete = await conceptObj.validateCompletness();
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
        throw new BaseError('Replication Process', error.status || 400, error.message, false)
    }
}

