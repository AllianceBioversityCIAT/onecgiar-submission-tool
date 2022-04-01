import { getRepository } from "typeorm";
import { InitiativesByStages, Stages } from "../entity";
import { Statuses } from "../entity/Statuses";
import { HttpStatusCode } from "../interfaces/Constants";
import { APIError } from "./BaseError";
import { ConceptHandler } from "./ConceptDomain";
import { ProposalHandler } from "./FullProposalDomain";
import { InitiativeStageHandler } from "./InitiativeStageDomain";

export class ReplicationDomain extends InitiativeStageHandler {
    /**
     * Replicate from pre concept to full proposal
     * 
     */

    public async replicationPre(initiativeId) {

        const initvStgRepo = getRepository(InitiativesByStages);
        const stgRepo = getRepository(Stages);
        const statusRepo = getRepository(Statuses);

        try {


            // full proposal stage 
            const proposalStage = await stgRepo.findOne({ where: { description: 'Full Proposal' } });

            //editing status
            const editingStatus = await statusRepo.findOne({ where: { status: 'Editing' } });
            // check if initiative exists in full proposal -- if not, create one
            let proposalInitvStg = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage: proposalStage } });
            if (!proposalInitvStg) {
                proposalInitvStg = new InitiativesByStages();
                proposalInitvStg.active = true;
                proposalInitvStg.initiative = initiativeId;
                proposalInitvStg.stage = proposalStage;
                proposalInitvStg.status = editingStatus;
                await initvStgRepo.save(proposalInitvStg);
            }
            // console.log(proposalInitvStg);
            const [
                GeneralInformation,
                // InitiativeStatements
            ] = await Promise.all([
                // replicate general information data in full proposal
                this.replicateGeneralInformation(proposalInitvStg),
                // replicate highlights to context in full proposal
                // this.replicateInitiativeStatements(proposalInitvStg)
            ]);

                console.log(GeneralInformation)
        } catch (error) {
            console.log(error);
            throw new APIError(
                'Bad request',
                HttpStatusCode.BAD_REQUEST,
                true,
                error.message
            );
        }
        //   initialTheoryChange: await metaData.pre_validationInitialTOC(),
        // results: null,
        // innovations: null,
        // keyPartners: null,
        // globalBudget: null
    }


    /**
     * 
     * REPLICATION PROCESS FOR THE PRE-CONCEPT STAGE (TO FULL PROPOSAL)
     * 
     */

    /**
     * 
     * @param proposalInitvStg : intiative in the proposal stage
     * @returns void | error
     */
    public async replicateGeneralInformation(proposalInitvStg: InitiativesByStages) {

        try {
            const preConcept = new ConceptHandler(this.initvStgId_);
            // get pre concept general information
            const pre_GI = await preConcept.getGeneralInformation();
            // console.log(pre_GI)

            // full proposal object
            const fullProposal = new ProposalHandler(proposalInitvStg.id);
            // check if general information already exists in FP
            const fullProposal_GI = await fullProposal.getGeneralInformation();
            // console.log(fullProposal_GI)

            // upsert general information to full proposal
            const response = await fullProposal.upsertGeneralInformation(fullProposal_GI['generalInformationId'] || null, pre_GI['name'], pre_GI['action_area_id'], pre_GI['action_area_description'], pre_GI['acronym']);
            return response;
        } catch (error) {
            console.log(error);
            throw new APIError(
                'Bad request',
                HttpStatusCode.BAD_REQUEST,
                true,
                error.message
            );
        }



    }

    public async replicateInitiativeStatements(proposalInitvStg: InitiativesByStages) {

        try {

            const preConcept = new ConceptHandler();
            // get pre concept intiative statements
            const { highlights, context } = await preConcept.requestInitiativeStatement();

            // full proposal object
            const fullProposal = new ProposalHandler(proposalInitvStg.id);
            // check if context already exists in full proposal
            const fullProposal_Context = await fullProposal.getContext();

            // upsert context data : challenge statement / 3 year outcomes
            const response = await fullProposal.upsertContext(fullProposal_Context.id, context.challenge_statement, context.smart_objectives);

            return response;
        } catch (error) {
            console.log(error);
            throw new APIError(
                'Bad request',
                HttpStatusCode.BAD_REQUEST,
                true,
                error.message
            );
        }




    }
} 