import { getRepository } from "typeorm";
import { Stages } from "../entity/Stages";
import { BaseError } from "../handlers/BaseError";
import { ConceptHandler } from "../handlers/ConceptDomain";
/**
 * 
 * @param initvStgId 
 * @param stageDescription 
 * @returns validatedSection
 */
export const validatedSection = async (initvStgId: number, stageDescription: string) => {
    let validatedSection: any;

    switch (stageDescription) {
        case 'concept': {
            // concept handler object 
            const conceptObj = new ConceptHandler(initvStgId.toString());
            const sectionsValidated = await conceptObj.validateSections();
            validatedSection = sectionsValidated;
            break;
        }

        default: {
            throw new BaseError('validatedSection', 400, 'Stage not available', false);

        }
    }

    return validatedSection;


}

export const forwardStage = async (replicationStagDsc: string, currentInitiativeId: string) => {
    const stagesRepo = getRepository(Stages);
    try {

        switch (replicationStagDsc) {
            case 'full_proposal': {
                const currentStage = await stagesRepo.findOne({ where: { description: 'Concept' } })
                // concept handler object 

                const conceptObj = new ConceptHandler(null, currentStage.id.toString(), currentInitiativeId);
                await conceptObj.setInitvStage();
                const isComplete = await conceptObj.validateCompletness();

                // if missing concept data, throw error 
                if (isComplete) {
                    // get full proposal data
                    const fullProposal = await conceptObj.forwardStage();
                    return fullProposal
                } else
                    throw new BaseError('Replication Process', 404, 'Incomplete concept', false);
                break;
            }

            default:
                break;
        }
    } catch (error) {
        throw new BaseError('Replication Process', error.status || 400, error.message, false)
    }
}

