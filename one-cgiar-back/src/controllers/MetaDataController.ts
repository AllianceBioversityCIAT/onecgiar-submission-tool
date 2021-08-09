import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { InitiativesByStages } from '../entity/InititativesByStages';
import { Stages } from '../entity/Stages';
import { BaseError } from '../handlers/BaseError';
import { MetaDataHandler } from '../handlers/MetaDataHandler';
import { ResponseHandler } from '../handlers/Response';


export async function getMenu(req: Request, res: Response) {

    // get initiative by stage id from clientF
    const { initiativeId } = req.params;

    try {

        // create new Meta Data object
        const metaData = new MetaDataHandler();

        let sections = await metaData.getSections(initiativeId);
        let subsections = await metaData.getSubSectios(initiativeId);
 
        res.json(new ResponseHandler('MetaData:Menu ', { sections, subsections }));

    } catch (error) {

        console.log(error)
        return res.status(error.httpCode).json(error);

    }


}