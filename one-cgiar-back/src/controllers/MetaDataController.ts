import { Request, Response } from 'express';
import { MetaDataHandler } from '../handlers/MetaDataHandler';
import { ResponseHandler } from '../handlers/Response';


export async function getMenu(req: Request, res: Response) {

    // get initiative by stage id from clientF
    const { initiativeId } = req.params;

    try {

        // create new Meta Data object
        const metaData = new MetaDataHandler();

        // Get metadata per sections
        let stages = await metaData.getStages(initiativeId);
        let sections = await metaData.getSections(initiativeId);
        let subsections = await metaData.getSubSectios(initiativeId);

        // Map metadata
        stages.map(stage => {
            stage['sections'] = sections.filter(s => {
                return (s.stageId === stage.stageId)
            })

            sections.map(section => {
                section['subsections'] = subsections.filter(sb => {
                    return (sb.sectionId === section.sectionId)
                })
            })
        })

        res.json(new ResponseHandler('MetaData:Menu ', { stages }));

    } catch (error) {

        return res.status(error.httpCode).json(error);

    }


}