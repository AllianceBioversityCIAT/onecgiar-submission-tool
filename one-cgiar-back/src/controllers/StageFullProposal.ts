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

        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        // get general information from porposal object
        const generalInformation = await fullPposal.getGeneralInformation();

        // get metadata
        let metadata = await fullPposal.metaData;
        // and filtered by section
        metadata = metadata.filter(meta => meta.group_by == 'General Information');

        res.json(new ResponseHandler('Full Proposal: General information.', { generalInformation, metadata }));
    } catch (error) {
        console.log(error)
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
    // get user id
    const { userId } = res.locals.jwtPayload;

console.log({ generalInformationId, name, action_area_id, action_area_description })

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);
    const initvUserRepo = getRepository(InitiativesByUsers);
    try {

        const userInitiative = await initvUserRepo.findOne({ where: { user: userId, active: true, initiative: initiativeId } });

        if (userInitiative == null) {
            throw new BaseError('General Information: Error', 406, 'User not found in initiative', false);
        }


        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());
        
        const generalInformation = await fullPposal.upsertGeneralInformation(generalInformationId, name, action_area_id, action_area_description)
        console.log(generalInformation)

        // get metadata
        let metadata = await fullPposal.metaData;
        // and filtered by section
        metadata = metadata.filter(meta => meta.group_by == 'General Information');

        res.json(new ResponseHandler('Full Proposal: General information.', { generalInformation, metadata }));
    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}