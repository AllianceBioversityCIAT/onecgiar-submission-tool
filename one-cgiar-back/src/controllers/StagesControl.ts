import { validate } from 'class-validator';
import { Request, Response } from 'express'
import { getConnection, getRepository, In } from 'typeorm'
import { ConceptInfo } from '../entity/ConceptInfo';
import { InitiativesByStages } from '../entity/InititativesByStages';

/****
 * 
 * **
 *  CONCEPT
 * **
 */

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

/**
 * 
 * @param req params:{ stageId, initiativeId }
 * @param res 
 */

export const getInitiativeConcept = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload;
    const { stageId, initiativeId } = req.params;
    const queryRunner = getConnection().createQueryBuilder();


    let conceptInfo,
        conceptQuery = ` 
            SELECT
                initvStg.id AS initvStgId,
                stage.description AS stageDesc,
                stage.active AS stageIsActive,
                concept.id AS conceptInfoId,
                concept.name AS conceptName,
                concept.challenge AS conceptChallenge,
                concept.objectives AS conceptObjectives,
                concept.results AS conceptResults,
                concept.highlights AS conceptHighlights,
                concept.action_area_description AS conceptActAreDes,
                concept.action_area_id AS conceptActAreId
            FROM
                initiatives_by_stages initvStg
            LEFT JOIN stages stage ON stage.id = initvStg.initiativeId
            LEFT JOIN concept_info concept ON concept.initvStgId = initvStgId
            LEFT JOIN initiatives_by_users initvUsr ON initvUsr.initiativeId = initvStg.initiativeId

            WHERE stage.id =:stageId
            AND initvStg.initiativeId =:initiativeId
            AND initvUsr.userId =:userId;
        `;

    try {
        const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
            conceptQuery,
            { stageId, initiativeId, userId },
            {}
        );
        conceptInfo = await queryRunner.connection.query(query, parameters);
        // console.log(conceptInfo, parameters)
        if (conceptInfo.length == 0)
            res.sendStatus(304);
        else
            res.json({ msg: 'Concept info for stage', data: conceptInfo });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not get concept info." });
    }




}
