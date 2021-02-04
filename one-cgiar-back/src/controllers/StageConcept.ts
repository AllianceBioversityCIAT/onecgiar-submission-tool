import { validate } from 'class-validator';
import { Request, Response } from 'express'
import { getConnection, getRepository, In } from 'typeorm'
import { ConceptInfo } from '../entity/ConceptInfo';
import { InitiativesByStages } from '../entity/InititativesByStages';
import { WorkPackages } from '../entity/WorkPackages';

/**
 * 
 * @param req params:{ name, challenge, objectives, results, highlights, action_area_id, action_area_description, initvStgId }
 * @param res 
 */
export const createConcept = async (req: Request, res: Response) => {
    const { name, challenge, objectives, results, highlights, action_area_id, action_area_description, initvStgId } = req.body;
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
    conceptInf.initvStg = initvStgId;

    try {

        let initiativeStg = await initvStgRepo.findOneOrFail(initvStgId, { relations: ['stage'] });
        conceptInf.initvStg = initiativeStg;


        /**
         * check if initiative have a concept
         */
        if (initiativeStg.stage.description.toLowerCase() == 'concept')
            res.sendStatus(500)
        else {

            const errors = await validate(conceptInf);
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            // let createdconceptInf = await concptInfoRepo.save(conceptInf);
            res.json({ msg: 'Concept info created', data: [] });
        }


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
                ,(SELECT GROUP_CONCAT(id SEPARATOR ', ') FROM work_packages WHERE initvStgId = initvStg.id) as workPackagesIds
                ,(SELECT GROUP_CONCAT(name SEPARATOR ', ') FROM work_packages WHERE initvStgId = initvStg.id) as workPackagesNames
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
        // console.log(conceptQuery, parameters)
        if (conceptInfo.length == 0)
            res.sendStatus(304);
        else
            res.json({ msg: 'Concept info for stage', data: conceptInfo });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not get concept info." });
    }




}


/**
 * 
 * @param req params: { name, results, pathway_content, is_global, initvStgId }
 * @param res 
 */
export const createWorkPackage = async (req: Request, res: Response) => {
    const { name, results, pathwayContent, isGlobal, initvStgId } = req.body;
    const initvStgRepo = getRepository(InitiativesByStages);
    const wpRepo = getRepository(WorkPackages);

    let newWP = new WorkPackages();
    newWP.name = name;
    newWP.results = results;
    newWP.pathway_content = pathwayContent;
    newWP.is_global = isGlobal;
    try {

        let initiativeStg = await initvStgRepo.findOneOrFail(initvStgId);
        newWP.initvStg = initiativeStg;

        const errors = await validate(newWP);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        newWP = await wpRepo.save(newWP);

        res.json({ msg: 'Work package created', data: newWP });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not create work package info." });
    }
}

/**
 * 
 * @param req params: { id, name, results, pathway_content, is_global, initvStgId }
 * @param res 
 */
export const updateWorkPackage = async (req: Request, res: Response) => {
    const { id, name, results, pathwayContent, isGlobal, initvStgId } = req.body;
    const initvStgRepo = getRepository(InitiativesByStages);
    const wpRepo = getRepository(WorkPackages);

    let workPackage = new WorkPackages();
    try {
        
        workPackage = await wpRepo.findOneOrFail(id);
        workPackage.results = results;
        workPackage.name = name;
        workPackage.pathway_content = pathwayContent;
        workPackage.is_global = isGlobal;

        let initiativeStg = await initvStgRepo.findOneOrFail(initvStgId);
        workPackage.initvStg = initiativeStg;

        const errors = await validate(workPackage);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        workPackage = await wpRepo.save(workPackage);

        res.json({ msg: 'Work package updated', data: workPackage });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not update work package info." });
    }

}