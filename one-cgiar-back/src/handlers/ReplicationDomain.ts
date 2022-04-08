import { getRepository } from "typeorm";
import { InitiativesByStages, Stages, WorkPackages } from "../entity";
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
                InitiativeStatements
            ] = await Promise.all([
                // replicate general information data in full proposal
                this.replicateGeneralInformation(proposalInitvStg),
                // replicate highlights to context in full proposal
                this.replicateInitiativeStatements(proposalInitvStg)
            ]);

            console.log(GeneralInformation);
            return { GeneralInformation, InitiativeStatements }
        } catch (error) {
            console.log(error);
            throw new APIError(
                'Bad request',
                HttpStatusCode.BAD_REQUEST,
                true,
                error.message
            );
        }
        /***
         * Missing Sections
        */
        //   initialTheoryChange: await metaData.pre_validationInitialTOC(),
        // results: null,
        // innovations: null,
        // keyPartners: null,
        // globalBudget: null
    }

    /**
    * Duplicate full proposal |  -- any stage
    * 
    */
    public async duplication(initiativeId, stageId) {

        const initvStgRepo = getRepository(InitiativesByStages);
        const stgRepo = getRepository(Stages);
        const statusRepo = getRepository(Statuses);
        try {

            // get initiative by stages : length should not be longer than 2
            const initvStgs = await initvStgRepo.find({ where: { initiative: initiativeId, stage: stageId }, order: { id: 'ASC' } });

            if (initvStgs.length >= 2) {
                const originalInitvStg = initvStgs[0];
                const replicateInitvStg = initvStgs[1];


                await this.duplicationWorkPackages(originalInitvStg, replicateInitvStg);



                throw new APIError(
                    'UNAUTHORIZED',
                    HttpStatusCode.UNAUTHORIZED,
                    true,
                    `Initiative with stage id : ${stageId} already duplicated.`
                );

                return;
            }


            const initvStg = (await this.initvStage)[0]

            // duplicated initiative by stage entity
            const duplInitvStg = new InitiativesByStages();
            duplInitvStg.active = true;
            duplInitvStg.initiative = initvStg.initiativeId;
            duplInitvStg.stage = initvStg.stageId;
            duplInitvStg.status = null;

            // set inactive original initiative by stage
            initvStg.active = false;

            // duplicated and original initiative by stages
            const [duplicated, original] = await initvStgRepo.save([duplInitvStg, initvStg]);

            const [
                GeneralInformation,
                Context,
            ] = await Promise.all([
                // duplicate general information data in full proposal
                this.duplicationGeneralInformation(original, duplicated),
                // duplicate context in full proposal
                this.duplicationContext(original, duplicated)
            ]);

            return [GeneralInformation, Context];

            // return null;
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

    /**
     * 
     * ***
     * ** DUPLICATION PROCESS FOR FULL PROPOSAL
     * ***
     */

    /**
     * 
     * @param originalInitv 
     * @param duplicatedInitv 
     * @returns General Information
     */
    async duplicationGeneralInformation(originalInitv, duplicatedInitv) {

        try {

            // full proposal object : original | duplicated
            const originalFP = new ProposalHandler(originalInitv.id);
            const duplicatedFP = new ProposalHandler(duplicatedInitv.id);

            // original | duplicated general information for FP
            const original_GI = await originalFP.getGeneralInformation();
            const duplicated_GI = await duplicatedFP.getGeneralInformation();

            // const response = await duplicatedFP.upsertGeneralInformation(upsertObject);
            const response = await duplicatedFP.upsertGeneralInformation(duplicated_GI['generalInformationId'] || null, original_GI['name'], original_GI['action_area_id'], original_GI['action_area_description'], original_GI['acronym'])
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

    /**
     * 
     * @param originalInitv 
     * @param duplicatedInitv 
     * @returns Context
     */
    async duplicationContext(originalInitv, duplicatedInitv) {

        try {

            // full proposal object : original | duplicated
            const originalFP = new ProposalHandler(originalInitv.id);
            const duplicatedFP = new ProposalHandler(duplicatedInitv.id);

            // original | duplicated context for FP
            const original_CO = await originalFP.getContext();
            const duplicated_CO = await duplicatedFP.getContext();
            
            const response = await duplicatedFP.upsertContext(duplicated_CO?.id || null, original_CO.challenge_statement, original_CO.smart_objectives, original_CO.key_learnings, original_CO.priority_setting, original_CO.comparative_advantage, original_CO.participatory_design);
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

    async duplicationWorkPackages(originalInitv, duplicatedInitv) {
        try {
            // full proposal object : original | duplicated
            const originalFP = new ProposalHandler(originalInitv.id);
            const duplicatedFP = new ProposalHandler(duplicatedInitv.id);

            // original | duplicated context for FP
            const original_WPS = await originalFP.getWorkPackage();
            const duplicated_WP = await duplicatedFP.getWorkPackage();

            const original_geoscope = await originalFP.getGeoScope();
            const duplicated_geoscope = await duplicatedFP.getGeoScope();



            // console.log(original_geoscope)
            let arrayUpsert = [];
            for (let index = 0; index < original_WPS.length; index++) {
                const org_wp = original_WPS[index];
                const newWP = new WorkPackages();
                newWP.id = duplicated_WP.find( d=> d.id == org_wp.id);
                newWP.acronym = org_wp.acronym;
                newWP.name = org_wp.name;
                newWP.pathway_content = org_wp.pathway_content;
                newWP.is_global = org_wp.is_global
                newWP.active = true;
                
                arrayUpsert.push(
                    // duplicatedFP.upsertWorkPackages(newWP)
                )
                
            }
            // console.log(arrayUpsert);

            // const response = await duplicatedFP.upsertWorkPackages
            // .upsertContext(duplicated_CO['id'] || null, original_CO.challenge_statement, original_CO.smart_objectives, original_CO.key_learnings, original_CO.priority_setting, original_CO.comparative_advantage, original_CO.participatory_design);
            return null//response;

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

    /**
     * 
     * REPLICATION PROCESS FOR THE PRE-CONCEPT STAGE (TO FULL PROPOSAL)
     * 
     */

    /**
     * 
     * @param proposalInitvStg : intiative in the proposal stage
     * @returns general information object | error
     */
    public async replicateGeneralInformation(proposalInitvStg: InitiativesByStages) {

        try {
            // pre concept object
            const preConcept = new ConceptHandler(this.initvStgId_);
            // full proposal object
            const fullProposal = new ProposalHandler(proposalInitvStg.id);


            // get pre concept general information
            const pre_GI = await preConcept.getGeneralInformation();

            // check if general information already exists in FP
            const fullProposal_GI = await fullProposal.getGeneralInformation();

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

    /**
     * 
     * @param proposalInitvStg : intiative in the proposal stage
     * @returns initiative statements object | error
     */
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