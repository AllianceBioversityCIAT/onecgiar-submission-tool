import { validate, ValidationError } from 'class-validator';
import { countReset } from 'console';
import { Request, Response } from 'express'
import { getConnection, getRepository, In } from 'typeorm'
import { ConceptInfo } from '../entity/ConceptInfo';
import { CountriesByWorkPackages } from '../entity/CountriesByWorkPackages';
import { Files } from '../entity/Files';
import { ImpactTimeFrames } from '../entity/ImpactTimeFrames';
import { Initiatives } from '../entity/Initiatives';
import { InitiativesByStages } from '../entity/InititativesByStages';
import { InitiativesByUsers } from '../entity/InititativesByUsers';
import { KeyPartners } from '../entity/KeyPartner';
import { Partnerships } from '../entity/Partnerships';
import { ProjectionBenefits } from '../entity/ProjectionBenefits';
import { RegionsByWorkPackages } from '../entity/RegionsByWorkPackages';
import { TOCs } from '../entity/TOCs';
import { Users } from '../entity/Users';
import { WorkPackages } from '../entity/WorkPackages';
import { APIError } from '../handlers/BaseError';
import { HttpStatusCode } from '../handlers/Constants';
import { ResponseHandler } from '../handlers/Response';
import { getClaActionAreas } from './Clarisa';


// import path from 'path';

// const parentDir = path.resolve(process.cwd(), '../');
const host = `${process.env.EXT_HOST}:${process.env.PORT}`;



//              ----------------------------                TO UPDATE             -------------------------------------            //

/**
 * 
 * @param req params:{ initvStgId }
 * @param res 
 */

export const getConceptGeneralInfo = async (req: Request, res: Response) => {
    const { initvStgId } = req.params;
    const queryRunner = getConnection().createQueryBuilder();


    try {
        let conceptInfo,
            conceptQuery = ` 
            SELECT
                initvStgs.id AS initvStgId,
                stage.description AS stageDesc,
                stage.active AS stageIsActive,

                (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS conceptLeadId,
                (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS conceptLead,
                (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'SGD') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS conceptEmail,

                (SELECT id FROM users WHERE id = (SELECT userId FROM initiatives_by_users initvUsr WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1)  ) AS conceptCoLeadId,
                (SELECT CONCAT(first_name, " ", last_name) FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS conceptCoLead,
                (SELECT email FROM users WHERE id = (SELECT userId FROM initiatives_by_users WHERE roleId = (SELECT id FROM roles WHERE acronym = 'PI') AND active = TRUE AND initiativeId = initvStgs.initiativeId LIMIT 1) ) AS conceptCoLeadEmail,


                concept.id AS conceptId,
                IF(concept.name IS NULL OR concept.name = '' , (SELECT name FROM initiatives WHERE id = initvStgs.id ), concept.name) AS conceptName,
                concept.action_area_description AS conceptActAreaDes,
                concept.action_area_id AS conceptActAreaId
                ,(SELECT GROUP_CONCAT(id SEPARATOR ', ') FROM work_packages WHERE initvStgId = initvStgs.id) as workPackagesIds
                ,(SELECT GROUP_CONCAT(name SEPARATOR ', ') FROM work_packages WHERE initvStgId = initvStgs.id) as workPackagesNames
            FROM
                initiatives_by_stages initvStgs
            LEFT JOIN stages stage ON stage.id = initvStgs.stageId
            LEFT JOIN concept_info concept ON concept.initvStgId = initvStgs.initiativeId

            WHERE initvStgs.id =:initvStgId;
        `;
        const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
            conceptQuery,
            { initvStgId },
            {}
        );
        conceptInfo = await queryRunner.connection.query(query, parameters);

        if (conceptInfo.length == 0) {
            throw new APIError(
                'NOT FOUND',
                HttpStatusCode.NOT_FOUND,
                true,
                'Concept Information not found.'
            );
        }
        else
            res.json(new ResponseHandler('Concept: General information.', { generaInformation: conceptInfo[0] }));
    } catch (error) {
        return res.status(error.httpCode).json(error);
    }




}


/**
 * 
 * @param req params: { conceptId, initvStgId, name, action_area_id, action_area_description }
 * @param res 
 */

export const upsertConceptGeneralInformation = async (req: Request, res: Response) => {
    // export const updateConcept = async (req: Request, res: Response) => {
    const { conceptId, initvStgId, name, action_area_id, action_area_description } = req.body;
    const { userId } = res.locals.jwtPayload;

    const concptInfoRepo = getRepository(ConceptInfo);
    const initvStgRepo = getRepository(InitiativesByStages);
    const initvUserRepo = getRepository(InitiativesByUsers);

    // const userRepo = getRepository(Users);
    const initiativeRepo = getRepository(Initiatives);
    const queryRunner = getConnection().createQueryBuilder();

    let conceptInf: ConceptInfo;

    try {

        /**
         * Validate user in initiative
         * 
         */

        const userInitiative = await initvUserRepo.findOne({ where: { user: userId, active: true } });

        if (userInitiative == null) {
            throw new APIError(
                'NOT FOUND',
                HttpStatusCode.NOT_FOUND,
                true,
                'User not found in initiative.'
            );
        }


        const initvStg = await initvStgRepo.findOne(initvStgId, { relations: ['initiative'] });
        if (initvStg == null) {
            throw new APIError('NOT FOUND', HttpStatusCode.NOT_FOUND, true, 'Initiative not found for current stage.')
        }

        const actionAreas = await getClaActionAreas();
        const selectedActionArea = actionAreas.find(area => area.id == action_area_id);

        if (conceptId == null) {
            conceptInf = new ConceptInfo();
            conceptInf.name = name;

            conceptInf.action_area_description = action_area_description || selectedActionArea.name;
            conceptInf.action_area_id = action_area_id;

            conceptInf.initvStg = initvStg;
            conceptInf.objectives = '';
            conceptInf.challenge = '';
            conceptInf.results = '';
            conceptInf.highlights = '';
        } else {
            conceptInf = await concptInfoRepo.findOne(conceptId);
            conceptInf.name = (name) ? name : conceptInf.name;
            conceptInf.action_area_description = selectedActionArea.name;
            conceptInf.action_area_id = (action_area_id) ? action_area_id : conceptInf.action_area_id;

        }
        let upsertedInfo = await concptInfoRepo.save(conceptInf);

        /**
         * update initiative name
         */

        const initiative = await initiativeRepo.findOne(initvStg.initiative.id);
        initiative.name = upsertedInfo.name;
        let updatedInitiative = await initiativeRepo.save(initiative);


        let conceptQuery = ` 
        SELECT
            initvStgs.id AS initvStgId,
            stage.description AS stageDesc,
            stage.active AS stageIsActive,
            concept.id AS conceptId,
            concept.name AS conceptName,
            concept.action_area_description AS conceptActAreaDes,
            concept.action_area_id AS conceptActAreaId
            ,(SELECT GROUP_CONCAT(id SEPARATOR ', ') FROM work_packages WHERE initvStgId = initvStgs.id) as workPackagesIds
            ,(SELECT GROUP_CONCAT(name SEPARATOR ', ') FROM work_packages WHERE initvStgId = initvStgs.id) as workPackagesNames
        FROM
            initiatives_by_stages initvStgs
        LEFT JOIN stages stage ON stage.id = initvStgs.stageId
        LEFT JOIN concept_info concept ON concept.initvStgId = initvStgs.initiativeId
        
        WHERE initvStgs.id =:initvStgId;
    `;
        const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
            conceptQuery,
            { initvStgId },
            {}
        );
        let conceptInfo = await queryRunner.connection.query(query, parameters);



        res.json(new ResponseHandler('Concept general information upserted.', { generaInformation: conceptInfo[0] }));

    } catch (error) {
        return res.status(error.httpCode).json(error);
    }

}




/**
 * 
 * @param req params:{ initvStgId }
 * @param res 
 */

export const getConceptNarratives = async (req: Request, res: Response) => {
    const { initvStgId } = req.params;
    const queryRunner = getConnection().createQueryBuilder();

    try {
        let conceptInfo,
            conceptQuery = ` 
            SELECT
                initvStgs.id AS initvStgId,
                stage.description AS stageDesc,
                stage.active AS stageIsActive,
                concept.id AS conceptId,
                concept.challenge AS conceptChallenge,
                concept.objectives AS conceptObjectives,
                concept.results AS conceptResults,
                concept.highlights AS conceptHiglights
            FROM
                initiatives_by_stages initvStgs
            LEFT JOIN stages stage ON stage.id = initvStgs.stageId
            LEFT JOIN concept_info concept ON concept.initvStgId = initvStgs.initiativeId

            WHERE initvStgs.id =:initvStgId;
        `;
        const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
            conceptQuery,
            { initvStgId },
            {}
        );
        conceptInfo = await queryRunner.connection.query(query, parameters);

        if (conceptInfo.length == 0) {
            throw new APIError(
                'NOT FOUND',
                HttpStatusCode.NOT_FOUND,
                true,
                'Concept Information not found.'
            );
        }
        else
            res.json(new ResponseHandler('Concept: Narratives.', { narratives: conceptInfo[0] }));
    } catch (error) {
        return res.status(error.httpCode).json(error);
    }




}

/**
 * 
 * @param req params: { conceptId, initvStgId, challenge, results, highlights, objectives }
 * @param res 
 */
export const upsertConceptNarratives = async (req: Request, res: Response) => {

    const { conceptId, initvStgId, challenge, results, highlights, objectives } = req.body;
    const concptInfoRepo = getRepository(ConceptInfo);
    const initvStgRepo = getRepository(InitiativesByStages);
    const queryRunner = getConnection().createQueryBuilder();

    let conceptInf: ConceptInfo;

    try {
        const initvStg = await initvStgRepo.findOne(initvStgId, { relations: ['initiative'] });
        if (initvStg == null) {
            throw new APIError('NOT FOUND', HttpStatusCode.NOT_FOUND, true, 'Initiative not found for current stage.')
        }

        if (conceptId == null) {
            conceptInf = new ConceptInfo();
            conceptInf.name = '';
            conceptInf.action_area_description = '';
            conceptInf.action_area_id = null;
            conceptInf.initvStg = initvStg;
            conceptInf.objectives = objectives;
            conceptInf.challenge = challenge;
            conceptInf.results = results;
            conceptInf.highlights = highlights;
        } else {
            conceptInf = await concptInfoRepo.findOne(conceptId);
            conceptInf.challenge = (challenge) ? challenge : conceptInf.challenge;
            conceptInf.results = (results) ? results : conceptInf.results;
            conceptInf.objectives = (objectives) ? objectives : conceptInf.objectives;
            conceptInf.results = (results) ? results : conceptInf.results;
            conceptInf.highlights = (highlights) ? highlights : conceptInf.highlights;
        }

        let upsertedInfo = await concptInfoRepo.save(conceptInf);


        let conceptQuery = ` 
        SELECT
            initvStgs.id AS initvStgId,
            stage.description AS stageDesc,
            stage.active AS stageIsActive,
            concept.id AS conceptId,
            concept.challenge AS conceptChallenge,
            concept.objectives AS conceptObjectives,
            concept.results AS conceptResults,
            concept.highlights AS conceptHiglights
        FROM
            initiatives_by_stages initvStgs
        LEFT JOIN stages stage ON stage.id = initvStgs.stageId
        LEFT JOIN concept_info concept ON concept.initvStgId = initvStgs.initiativeId

		WHERE concept.id =:conceptId;
    `;
        const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
            conceptQuery,
            { conceptId: conceptInf.id },
            {}
        );
        let narratives = await queryRunner.connection.query(query, parameters);

        // console.log(narratives)

        res.json(new ResponseHandler('Concept narratives upserted.', { narratives: narratives[0] }));

    } catch (error) {
        return res.status(error.httpCode).json(error);
    }

}

/**
 * 
 * @param req params: { initvStgId }
 * @param res 
 */
export const getWorkPackages = async (req: Request, res: Response) => {
    const { initvStgId } = req.params;
    const wpRepo = getRepository(WorkPackages);

    try {

        const workPackages = await wpRepo.find({ where: { initvStg: initvStgId, active: 1 } });
        if (workPackages.length == 0) {
            throw new APIError(
                'NOT FOUND',
                HttpStatusCode.NOT_FOUND,
                true,
                'Workpackages not found for initiative.'
            );
        } else {
            res.json(new ResponseHandler('Work packages.', { workPackages }));
        }
    } catch (error) {
        return res.status(error.httpCode).json(error);
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

    try {
        let workPackage = new WorkPackages();
        workPackage.name = name || null;
        workPackage.results = results || null;
        workPackage.pathway_content = pathwayContent || null;
        workPackage.is_global = isGlobal || null;

        let initiativeStg = await initvStgRepo.findOneOrFail(initvStgId);
        workPackage.initvStg = initiativeStg;

        const errors = await validate(workPackage);
        if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            throw new APIError(
                'BAD REQUEST',
                HttpStatusCode.BAD_REQUEST,
                true,
                message
            );
        }

        workPackage = await wpRepo.save(workPackage);

        res.json(new ResponseHandler('Work package created.', { workPackage }));

    } catch (error) {
        return res.status(error.httpCode).json(error);
    }
}

/**
 * 
 * @param req params: { id, name, results, pathway_content, is_global }
 * @param res 
 */
export const updateWorkPackage = async (req: Request, res: Response) => {
    const { id, name, results, pathwayContent, isGlobal } = req.body;
    const wpRepo = getRepository(WorkPackages);

    try {
        let workPackage = new WorkPackages();
        workPackage = await wpRepo.findOneOrFail(id);
        workPackage.results = (results) ? results : workPackage.results;
        workPackage.name = (name) ? name : workPackage.name;
        workPackage.pathway_content = (pathwayContent) ? pathwayContent : workPackage.pathway_content;
        workPackage.is_global = isGlobal;
        // workPackage.is_global = (isGlobal != null) ? isGlobal : workPackage.is_global;

        const errors = await validate(workPackage);
        if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            throw new APIError(
                'BAD REQUEST',
                HttpStatusCode.BAD_REQUEST,
                true,
                message
            );
        }

        workPackage = await wpRepo.save(workPackage);

        res.json(new ResponseHandler('Work package updated.', { workPackage }));

    } catch (error) {
        return res.status(error.httpCode).json(error);
    }

}

/**
 * 
 * @param req params: { wrkPkgId }
 * @param res 
 */
export const getRegionWorkPackage = async (req: Request, res: Response) => {

    const { wrkPkgId } = req.params;

    const wpRepo = getRepository(WorkPackages);
    const regionRepo = getRepository(RegionsByWorkPackages);
    const countryRepo = getRepository(CountriesByWorkPackages);


    try {
        const workPackage = await wpRepo.findOneOrFail(wrkPkgId);
        const regions = await regionRepo.find({ where: { wrkPkg: workPackage, active: 1 } });
        const countries = await countryRepo.find({ where: { wrkPkg: workPackage, active: 1 } });

        res.json(new ResponseHandler('Regions / countries by work package.', { regions, countries }));

    } catch (error) {
        return res.status(error.httpCode).json(error);
    }

}

/**
 * 
 * @param req params:  { wrkPkgId, regionId, active }
 * @param res 
 */
export const upsertRegionWorkPackage = async (req: Request, res: Response) => {
    const { wrkPkgId, regionId, active } = req.body;
    const wpRepo = getRepository(WorkPackages);
    const regionRepo = getRepository(RegionsByWorkPackages);

    let wrkRegion: RegionsByWorkPackages;

    try {
        const workPackage = await wpRepo.findOneOrFail(wrkPkgId);

        wrkRegion = await regionRepo.findOne({ where: { region_id: regionId, wrkPkg: workPackage } });
        if (wrkRegion) {
            wrkRegion.active = active;
        } else {
            wrkRegion = new RegionsByWorkPackages();
            wrkRegion.active = active;
            wrkRegion.wrkPkg = workPackage;
            wrkRegion.region_id = regionId;
        }

        const errors = await validate(wrkRegion);
        if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            throw new APIError(
                'BAD REQUEST',
                HttpStatusCode.BAD_REQUEST,
                true,
                message
            );
        } else {
            let region = await regionRepo.save(wrkRegion);

            res.json(new ResponseHandler('Work package region updated.', { region }));

        }

    } catch (error) {
        return res.status(error.httpCode).json(error);
    }
}


/**
 * 
 * @param req params:  { wrkPkgId, countryId, active }
 * @param res 
 */
export const upsertCountryWorkPackage = async (req: Request, res: Response) => {
    const { wrkPkgId, countryId, active } = req.body;
    const wpRepo = getRepository(WorkPackages);
    const regionRepo = getRepository(CountriesByWorkPackages);


    try {
        let cntryRegion: CountriesByWorkPackages;
        const workPackage = await wpRepo.findOneOrFail(wrkPkgId);

        cntryRegion = await regionRepo.findOne({ where: { region_id: countryId, wrkPkg: workPackage } });
        if (cntryRegion) {
            cntryRegion.active = active;
        } else {
            cntryRegion = new CountriesByWorkPackages();
            cntryRegion.active = active;
            cntryRegion.wrkPkg = workPackage;
            cntryRegion.country_id = countryId;
        }

        const errors = await validate(cntryRegion);
        if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            throw new APIError(
                'BAD REQUEST',
                HttpStatusCode.BAD_REQUEST,
                true,
                message
            );
        } else {
            let country = await regionRepo.save(cntryRegion);
            res.json(new ResponseHandler('Work package country updated.', { country }));
        }

    } catch (error) {
        return res.status(error.httpCode).json(error);
    }
}







/**
 * 
 * @param req params: { wrkPkgId }
 * @param res 
 */
export const getProjectedBenefitWorkPackage = async (req: Request, res: Response) => {
    const { wrkPkgId } = req.params;
    const pbRepo = getRepository(ProjectionBenefits);

    try {
        const projectedBenefits = await pbRepo.find({ where: { wrkPkg: wrkPkgId, active: true } });
        if (projectedBenefits.length == 0) {
            throw new APIError(
                'NOT FOUND',
                HttpStatusCode.NOT_FOUND,
                true,
                'Projection benefits not found.'
            );
        } else {
            res.json(new ResponseHandler('Projected benefits from work package.', { projectedBenefits }));
        }

    } catch (error) {
        return res.status(error.httpCode).json(error);
    }
}


/**
 * 
 * @param req params: { id, wrkPkgId, impactAreaIndicatorId, impactAreaIndicatorName, notes, impactAreaId, impactAreaName }
 * @param res 
 */
export const upsertProjectedBenefitWorkPackage = async (req: Request, res: Response) => {
    const { id, wrkPkgId, impactAreaIndicatorId, impactAreaIndicatorName, notes, impactAreaId, impactAreaName, active } = req.body;
    try {
        const prjBfnRepo = getRepository(ProjectionBenefits);
        const wpRepo = getRepository(WorkPackages);
        let prjtedBfnt: ProjectionBenefits;

        if (id) {
            prjtedBfnt = await prjBfnRepo.findOne({ where: { id: id, wrkPkg: wrkPkgId } });
            prjtedBfnt.notes = (notes) ? notes : prjtedBfnt.notes;
            prjtedBfnt.active = active;
            // prjtedBfnt.active = (active) ? active : prjtedBfnt.active;
            prjtedBfnt.impact_area_indicator_id = (impactAreaIndicatorId) ? impactAreaIndicatorId : prjtedBfnt.impact_area_indicator_id;
            prjtedBfnt.impact_area_indicator_name = (impactAreaIndicatorName) ? impactAreaIndicatorName : prjtedBfnt.impact_area_indicator_name;
        } else {
            prjtedBfnt = new ProjectionBenefits();
            const workPackage = await wpRepo.findOneOrFail(wrkPkgId);
            prjtedBfnt.notes = notes;
            prjtedBfnt.impact_area_id = impactAreaId;
            prjtedBfnt.impact_area_indicator_id = impactAreaIndicatorId;
            prjtedBfnt.impact_area_indicator_name = impactAreaIndicatorName;
            prjtedBfnt.impact_area_name = impactAreaName;
            prjtedBfnt.wrkPkg = workPackage;
            prjtedBfnt.active = active;
        }

        const errors = await validate(prjtedBfnt);
        if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            throw new APIError(
                'BAD REQUEST',
                HttpStatusCode.BAD_REQUEST,
                true,
                message
            );
        }

        let projectedBenefit = await prjBfnRepo.save(prjtedBfnt);

        res.json(new ResponseHandler('Projected benefit added to work package.', { projectedBenefit }));

    } catch (error) {
        return res.status(error.httpCode).json(error);
    }
}





/**
 * 
 * @param req params: { prjctBnftId }
 * @param res 
 */
export const getTimeFramesProjectedBenefit = async (req: Request, res: Response) => {
    const { prjctBnftId } = req.params;
    const tfRepo = getRepository(ImpactTimeFrames);

    try {
        const timeFrames = await tfRepo.find({ where: { proBnft: prjctBnftId, active: true } });
        if (timeFrames.length == 0) {
            throw new APIError(
                'NOT FOUND',
                HttpStatusCode.NOT_FOUND,
                true,
                'Time frames not found.'
            );
        } else {
            res.json(new ResponseHandler('Time frames from projected benefit.', { timeFrames }));
        }
    } catch (error) {
        return res.status(error.httpCode).json(error);
    }
}


/**
 * 
 * @param req params: { id, prjtBenefitId, year, lowScenario, highScenario, active }
 * @param res 
 */
export const upsertTimeFrameProjectedBenefit = async (req: Request, res: Response) => {
    const { id, prjtBenefitId, year, lowScenario, highScenario, active } = req.body;

    try {
        const prjBfnRepo = getRepository(ProjectionBenefits);
        const tfRepo = getRepository(ImpactTimeFrames);

        let timeFrame: ImpactTimeFrames;

        const prjtBnefit = await prjBfnRepo.findOne(prjtBenefitId);

        if (id) {
            timeFrame = await tfRepo.findOne(id);
            if (!timeFrame) {
                throw new APIError(
                    'NOT FOUND',
                    HttpStatusCode.NOT_FOUND,
                    true,
                    'Time frames not found.'
                );
            } else {
                timeFrame.active = active;
                // timeFrame.active = (active) ? active : timeFrame.active;
                timeFrame.high_scenario = (highScenario) ? highScenario : timeFrame.high_scenario;
                timeFrame.low_scenario = (lowScenario) ? lowScenario : timeFrame.low_scenario;
                timeFrame.year = (year) ? year : timeFrame.year;
            }
        } else {
            timeFrame = new ImpactTimeFrames();
            timeFrame.proBnft = prjtBnefit;
            timeFrame.active = active;
            timeFrame.low_scenario = lowScenario;
            timeFrame.high_scenario = highScenario;
            timeFrame.proBnft = prjtBnefit;
            timeFrame.year = year;
        }

        const errors = await validate(timeFrame);
        if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            throw new APIError(
                'BAD REQUEST',
                HttpStatusCode.BAD_REQUEST,
                true,
                message
            );
        }

        let impactTimeFrame = await tfRepo.save(timeFrame);

        // res.json({ msg: 'Impact time frame added to projected benefit', data: { impactTimeFrame } });
        res.json(new ResponseHandler('Impact time frame added to projected benefit.', { impactTimeFrame }));
    } catch (error) {
        return res.status(error.httpCode).json(error);
    }

}











/**
 * 
 * @param req params:{ initvStgId, narrative }
 * @param res 
 */
export const addTOCConcept = async (req: Request, res: Response) => {
    const { initvStgId, narrative } = req.body;

    try {
        const tocsRepo = getRepository(TOCs);
        const initvStgRepo = getRepository(InitiativesByStages);
        const filesRepo = getRepository(Files);

        const newTOC = new TOCs();
        let iniStg = await initvStgRepo.findOne(initvStgId);
        newTOC.narrative = narrative;
        newTOC.initvStg = iniStg;

        let TOC = await tocsRepo.save(newTOC);
        const files = req['files'];

        if (files) {

            let filesArr = [];
            for (let index = 0; index < files.length; index++) {
                const element = files[index];
                // console.log(`${__dirname}/`)
                console.log(`${host}/${element.path}`)
                filesArr.push(
                    {
                        active: true,
                        url: `${host}/${element.path}`,
                        name: element.originalname
                    }
                )
            }
            const _files = filesRepo.create(filesArr);
            _files.forEach(file => {
                file.tocs = TOC;
            });
            let Files = await filesRepo.save(_files);

            res.json(new ResponseHandler('TOC added to concept.', { TOC, Files }));
        } else {
            throw new APIError(
                'NOT FOUND',
                HttpStatusCode.NOT_FOUND,
                true,
                'None files found.'
            );
        }

    } catch (error) {
        return res.status(error.httpCode).json(error);
    }
}

/**
 * 
 * @param req params:{ tocId, narrative }
 * @param res 
 */
// export const updateTOCConcept = async (req: Request, res: Response) => {
//     const { id, narrative } = req.body;
//     const tocsRepo = getRepository(TOCs);

//     try {
//         const toc = await tocsRepo.findOneOrFail(id);
//         toc.narrative = narrative;

//         let _toc = await tocsRepo.save(toc);
//         res.json(new ResponseHandler('TOC narrative updated in concept.', { TOC: _toc }));
//     } catch (error) {
//         return res.status(error.httpCode).json(error);
//     }

// }


/**
 * 
 * @param req params:{ tocId }
 * @param res 
 */
export const upsertTOCandFile = async (req: Request, res: Response) => {
    const { initvStgId, narrative } = req.body;
    const tocsRepo = getRepository(TOCs);
    const filesRepo = getRepository(Files);


    try {
        let existingTOC = await tocsRepo.findOne({ where: { initvStg: initvStgId } });
        const files = req['files'];
        if (existingTOC == null) {
            existingTOC = new TOCs();
            existingTOC.narrative = narrative;
            existingTOC.initvStg = initvStgId;
        } else {
            existingTOC.narrative = (narrative) ? narrative : existingTOC.narrative;
        }
        const TOC = await tocsRepo.save(existingTOC);

        if (files) {

            let filesArr = [];
            for (let index = 0; index < files.length; index++) {
                const element = files[index];
                console.log(`${host}/public/${new Date().getFullYear()}/initiatives/${initvStgId}/${element.originalname}`)
                filesArr.push(
                    {
                        active: true,
                        url: `${host}/public/${new Date().getFullYear()}/${initvStgId}/${element.originalname}`,
                        name: element.originalname
                    }
                )
            }
            const _files = filesRepo.create(filesArr);
            _files.forEach(file => {
                file.tocs = TOC;
            });
            let Files = await filesRepo.save(_files);
            res.json(new ResponseHandler('File added to TOC.', { TOC: TOC, Files }));
        } else {
            throw new APIError(
                'NOT FOUND',
                HttpStatusCode.NOT_FOUND,
                true,
                'None files found.'
            );
        }


    } catch (error) {
        return res.status(error.httpCode).json(error);
    }

}

/**
 * 
 * @param req params:{ initvStgId }
 * @param res 
 */
export const getTOCFiles = async (req: Request, res: Response) => {
    const { initvStgId } = req.params;
    const tocRepo = getRepository(TOCs);
    // const initvStgRepo = getRepository(InitiativesByStages);
    const filesRepo = getRepository(Files);

    try {
        let TOC = await tocRepo.findOne({ where: { initvStg: initvStgId } });

        if (TOC == null) {
            res.json(new ResponseHandler('TOC and files.', { TOC }));
        } else {
            const Files = await filesRepo.find({ where: { tocs: TOC.id, active: 1 } });
            // console.log(Files)
            if (Files.length > 0) {
                TOC['files'] = Files;
            }

            res.json(new ResponseHandler('TOC and files.', { TOC }));

        }
    } catch (error) {
        return res.status(error.httpCode).json(error);
    }
}

/**
 * 
 * @param req params:{ fileId, active, url, name }
 * @param res 
 */
export const updateTOCFile = async (req: Request, res: Response) => {
    const { id, active, url, name } = req.body;
    const filesRepo = getRepository(Files);

    try {
        const file = await filesRepo.findOne(id);
        if (file == null) {
            throw new APIError(
                'NOT FOUND',
                HttpStatusCode.NOT_FOUND,
                true,
                'Theory of change file not found.'
            );
        }
        file.active = active;
        file.url = (url) ? url : file.url;
        file.name = (name) ? name : file.name;

        let Files = await filesRepo.save(file);
        res.json(new ResponseHandler('Files.', { Files }));
    } catch (error) {
        return res.status(error.httpCode).json(error);
    }

}








/**
 * 
 * @param req params:{ initvStgId, id, comparative_advantage, key_partners }
 * @param res 
 */
export const upsertPartnerships = async (req: Request, res: Response) => {
    const { initvStgId, id, comparative_advantage, key_partners } = req.body;
    const partRepo = getRepository(Partnerships);
    const keyPartnersRepo = getRepository(KeyPartners);
    const initvStgRepo = getRepository(InitiativesByStages);
    let partnership: Partnerships;
    try {
        if (initvStgId == null) {
            throw new APIError(
                'NOT FOUND',
                HttpStatusCode.NOT_FOUND,
                true,
                'None initiative by stage sent.'
            );
        }

        const initvStg = await initvStgRepo.findOne(initvStgId);
        if (id) {
            partnership = await partRepo.findOne(id);
            partnership.comparative_advantage = (comparative_advantage) ? comparative_advantage : partnership.comparative_advantage;
        } else {
            partnership = new Partnerships();
            partnership.comparative_advantage = comparative_advantage;
            partnership.initvStg = initvStg;
        }

        partnership = await partRepo.save(partnership);

        key_partners.forEach(kp => {
            kp['partnerships'] = partnership
        });

        let keyPartners = await keyPartnersRepo.save(key_partners);


        res.json(new ResponseHandler('Key Partners updated.', { partnership, keyPartners }));

    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }
}

/**
 * 
 * @param req params:{ initvStgId }
 * @param res 
 */
export const getPartnerships = async (req: Request, res: Response) => {
    const { initvStgId } = req.params;
    const partRepo = getRepository(Partnerships);
    const keyPartnersRepo = getRepository(KeyPartners);
    // const initvStgRepo = getRepository(InitiativesByStages);

    let partnership: Partnerships, keyPartners: KeyPartners[];
    try {
        if (initvStgId == null) {
            throw new APIError(
                'NOT FOUND',
                HttpStatusCode.NOT_FOUND,
                true,
                'None initiative by stage sent.'
            );
        }
        partnership = await partRepo.findOne({ where: { initvStg: initvStgId } });
        keyPartners = await keyPartnersRepo.find({ where: { partnerships: partnership } });

        res.json(new ResponseHandler('Key Partners list.', { partnership, keyPartners }));

    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }
}
