import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { InitiativesByStages } from '../entity/InititativesByStages';
import { Stages } from '../entity/Stages';
import { BaseError } from '../handlers/BaseError';
import {PreviewsDomain}  from '../handlers/PreviewsDomain';
import { ResponseHandler } from '../handlers/Response';

/**
 * ****************************
 * PREVIEWS FOR PROPOSAL STAGES
 * ****************************
 */

/**
 * GET PREVIEW FOR PARTNERS SECTION
 * @param req { initiativeId, stageId }
 * @param res { previewPartners }
 * @returns 
 */
export async function getPreviewPartners(req: Request, res: Response) {

    const { initiativeId, stageId } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { id: stageId } });

        // get intiative by stage
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null || initvStg == undefined) {
            throw new BaseError('Previews: Error', 400, `Previews not found in stage:` + stageId, false);
        }

        // create new full proposal object
        const previewsdomain = new PreviewsDomain();

        const previewPartners = await previewsdomain.requestPreviewPartners(initvStg.id.toString());

        res.json(new ResponseHandler('Full Proposal:Preview Partners', { previewPartners }));


    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }


}

/**
 * GET PREVIEW FOR PROJECTED BENEFITS
 * @param req { initiativeId, stageId }
 * @param res { previewProjectedBenefits }
 * @returns 
 */
 export async function getPreviewProjectedBenefits(req: Request, res: Response) {

    const { initiativeId, stageId } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { id: stageId } });

        // get intiative by stage
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null || initvStg == undefined) {
            throw new BaseError('Previews: Error', 400, `Previews not found in stage:` + stageId, false);
        }

        // create new full proposal object
        const previewsdomain = new PreviewsDomain();

        const previewProjectedBenefits = await previewsdomain.requestPreviewProjectedBenefits(initvStg.id.toString());

        res.json(new ResponseHandler('Full Proposal:Preview Partners', { previewProjectedBenefits }));


    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }


}




