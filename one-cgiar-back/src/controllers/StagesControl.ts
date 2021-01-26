import { validate } from 'class-validator';
import { Request, Response } from 'express'
import { getRepository, In } from 'typeorm'
import { ConceptInfo } from '../entity/ConceptInfo';
import { InitiativesByStages } from '../entity/InititativesByStages';

export const createConcept = async (req: Request, res: Response) => {
    const { name, challenge, objectives, results, highlights, action_area_id, action_area_description, initiative_by_stage_id } = req.body;
    const initvStgRepo = getRepository(InitiativesByStages);
    const concptInfoRepo = getRepository(ConceptInfo);

    const conceptInf = new ConceptInfo();
    conceptInf.name = name;
    conceptInf.challenge = challenge;
    conceptInf.objectives = objectives;
    conceptInf.results = results;
    conceptInf.highlights = highlights;
    conceptInf.action_area_description = action_area_description;
    conceptInf.action_area_id = action_area_id;
    conceptInf.initvStg = initiative_by_stage_id;

    try {

        let initiativeStg = await initvStgRepo.findOneOrFail(initiative_by_stage_id);
        conceptInf.initvStg = initiativeStg;

        const errors = await validate(conceptInf);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        let createdconceptInf = await concptInfoRepo.save(conceptInf);
        res.json({ msg: 'Concept info created', data: createdconceptInf });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not create concept info." });
    }
}