import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { InitiativesByStages } from '../entity/InititativesByStages';
import { Stages } from '../entity/Stages';
import { BaseError } from '../handlers/BaseError';
import { MetaDataHandler } from '../handlers/MetaDataHandler';
import { ResponseHandler } from '../handlers/Response';


export async function getMenu(req: Request, res: Response) {

    // get initiative by stage id from clientF
    const { initiativeId, stageId } = req.params;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        const stage = await stageRepo.findOne(stageId);
        // get intiative by stage
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Add link: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }

        // create new Meta Data object
        const fullPposal = new MetaDataHandler(initvStg.id.toString());

        let sections = await fullPposal.getSections();
        let subsections = await fullPposal.getSubSectios();
        let oneSubsection = await fullPposal.getSubSectiosByName("General Information");
        let fields = await fullPposal.getField("General Information");


        res.json(new ResponseHandler('MetaData:Menu ', { sections, subsections }));

    } catch (error) {

        console.log(error)
        return res.status(error.httpCode).json(error);

    }


}