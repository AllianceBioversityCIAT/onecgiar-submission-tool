import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { InitiativesByStages } from '../entity/InititativesByStages';
import { InitiativesByUsers } from '../entity/InititativesByUsers';
import { Stages } from '../entity/Stages';
import { BaseError } from '../handlers/BaseError';
import { ProposalHandler } from '../handlers/FullProposalController';
import { ResponseHandler } from '../handlers/Response';

const host = `${process.env.EXT_HOST}:${process.env.PORT}`;

/**
 * 
 * @param req initiativeId
 * @param res  { generalInformation, metadata }
 * @returns  { generalInformation, metadata }
 */

export const getGeneralInformation = async (req: Request, res: Response) => {
    // get initiative by stage id from client
    const { initiativeId } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);
    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read General information: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }

        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        // get general information from porposal object
        const generalInformation = await fullPposal.getGeneralInformation();

        //set metadata
        fullPposal.metaData = "General Information";

        // get metadata
        let metadata = await fullPposal.metaData;

        // and filter by section
        // metadata = metadata.filter(meta => meta.group_by == 'General Information');

        res.json(new ResponseHandler('Full Proposal: General information.', { generalInformation, metadata }));
    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }
}


/**
 * 
 * @param req initiativeId
 * @param res { context, metadata }
 * @returns  { context, metadata }
 */
export const getContext = async (req: Request, res: Response) => {
    // get initiative by stage id from client
    const { initiativeId } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);
    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read Context: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }

        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        // get context from porposal object
        const context = await fullPposal.getContext();

        //set metadata
        fullPposal.metaData = "Context";

        // get metadata
        let metadata = await fullPposal.metaData;
        // and filter by section
        // metadata = metadata.filter(meta => meta.group_by == 'Context');

        res.json(new ResponseHandler('Full Proposal: Context.', { context, metadata }));
    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }
}


export async function getWorkPackage(req: Request, res: Response) {

    const { initiativeId } = req.params;
    
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {
        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read Workpackage: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }

        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        // get workpackage from porposal object
        const workpackage = await fullPposal.getWorkPackage();

        res.json(new ResponseHandler('Full Proposal: Workpackage.', { workpackage }));
    } catch (error) {
        return res.status(error.httpCode).json(error);
    }

}

/**
 * 
 * @param req initiativeId, generalInformationId, name, action_area_id, action_area_description 
 * @param res { generalInformation, metadata }
 * @returns { generalInformation, metadata }
 */
export const upsertGeneralInformation = async (req: Request, res: Response) => {
    // get initiative by stage id from client
    const { initiativeId } = req.params;
    // get generalInformationId, name, action_area_id, action_area_description by stage id from client
    const { generalInformationId, name, action_area_id, action_area_description } = req.body;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);
    try {

        // const userInitiative = await initvUserRepo.findOne({ where: { user: userId, active: true, initiative: initiativeId } });

        // if (userInitiative == null) {
        //     throw new BaseError('General Information: Error', 400, 'User not found in initiative', false);
        // }


        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        if (initvStg == null) {
            throw new BaseError('Upsert General information: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const generalInformation = await fullPposal.upsertGeneralInformation(generalInformationId, name, action_area_id, action_area_description)

        //set metadata
        fullPposal.metaData = "General Information";

        // get metadata
        let metadata = await fullPposal.metaData;
        // and filter by section
        // metadata = metadata.filter(meta => meta.group_by == 'General Information');

        res.json(new ResponseHandler('Full Proposal: General information.', { generalInformation, metadata }));
    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }
}


/**
 * 
 * @param req  contextId, challenge_statement, smart_objectives, key_learnings, priority_setting, comparative_advantage, participatory_design
 * @param res { context, metadata }
 * @returns { context, metadata }
 */

export const upsertContext = async (req: Request, res: Response, next) => {
    // get initiative by stage id from client
    const { initiativeId } = req.params;
    // get generalInformationId, name, action_area_id, action_area_description by stage id from client
    const { contextId, challenge_statement, smart_objectives, key_learnings, priority_setting, comparative_advantage, participatory_design } = req.body;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Upsert Context: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        // get context data
        const context = await fullPposal.upsertContext(contextId, challenge_statement, smart_objectives, key_learnings, priority_setting, comparative_advantage, participatory_design);

        //set metadata
        fullPposal.metaData = "Context";

        // get metadata
        let metadata = await fullPposal.metaData;
        // and filter by section
        // metadata = metadata.filter(meta => meta.group_by == 'Context');

        res.json(new ResponseHandler('Full Proposal: Context.', { context, metadata }));
        next();
    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }
}


