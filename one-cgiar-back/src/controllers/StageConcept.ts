import { validate } from 'class-validator';
import { countReset } from 'console';
import { Request, Response } from 'express'
import { getConnection, getRepository, In } from 'typeorm'
import { ConceptInfo } from '../entity/ConceptInfo';
import { CountriesByWorkPackages } from '../entity/CountriesByWorkPackages';
import { Files } from '../entity/Files';
import { ImpactTimeFrames } from '../entity/ImpactTimeFrames';
import { InitiativesByStages } from '../entity/InititativesByStages';
import { ProjectionBenefits } from '../entity/ProjectionBenefits';
import { RegionsByWorkPackages } from '../entity/RegionsByWorkPackages';
import { TOCs } from '../entity/TOCs';
import { WorkPackages } from '../entity/WorkPackages';

/**
 * 
 * @param req params:{ stageId, initiativeId }
 * @param res 
 */

export const getInitiativeConcept = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload;
    const { initvStgId } = req.params;
    const queryRunner = getConnection().createQueryBuilder();


    let conceptInfo,
        conceptQuery = ` 
        SELECT
            initvStgs.id AS initvStgId,
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
            ,(SELECT GROUP_CONCAT(id SEPARATOR ', ') FROM work_packages WHERE initvStgId = initvStgs.id) as workPackagesIds
            ,(SELECT GROUP_CONCAT(name SEPARATOR ', ') FROM work_packages WHERE initvStgId = initvStgs.id) as workPackagesNames
        FROM
                initiatives_by_stages initvStgs
        LEFT JOIN stages stage ON stage.id = initvStgs.stageId
        LEFT JOIN concept_info concept ON concept.initvStgId = initvStgs.initiativeId
        LEFT JOIN initiatives_by_users initvUsr ON initvUsr.initiativeId = initvStgs.initiativeId

            WHERE initvStgs.id =:initvStgId
            AND initvUsr.userId =:userId;
        `;

    try {
        const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
            conceptQuery,
            { initvStgId, userId },
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
        const _concept = await concptInfoRepo.findOne({ where: { initvStg: initiativeStg.id } })
        console.log(_concept)
        if (_concept)
            res.sendStatus(403)
        else {

            const errors = await validate(conceptInf);
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            let conceptInfo = await concptInfoRepo.save(conceptInf);
            res.json({ msg: 'Concept info created', data: conceptInfo });
        }


    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not create concept info." });
    }
}

/**
 * 
 * @param req params:{ id, name, challenge, objectives, results, highlights, action_area_id, action_area_description }
 * @param res 
 */
export const updateConcept = async (req: Request, res: Response) => {
    const { id, name, challenge, objectives, results, highlights, action_area_id, action_area_description } = req.body;
    const concptInfoRepo = getRepository(ConceptInfo);

    let conceptInf:ConceptInfo;

    try {
        conceptInf = await concptInfoRepo.findOneOrFail(id);
        console.log(id, conceptInf)
        conceptInf.name = (name) ? name : conceptInf.name;
        conceptInf.challenge = (challenge) ? challenge : conceptInf.challenge;
        conceptInf.objectives = (objectives) ? objectives : conceptInf.objectives;
        conceptInf.results = (results) ? results : conceptInf.results;
        conceptInf.highlights = (highlights) ? highlights : conceptInf.highlights;
        conceptInf.action_area_id = (action_area_id) ? parseInt(action_area_id) : conceptInf.action_area_id;
        conceptInf.action_area_description = (action_area_description) ? action_area_description : conceptInf.action_area_description;

        const errors = await validate(conceptInf);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        let conceptInfo = await concptInfoRepo.save(conceptInf);
        res.json({ msg: 'Concept info updated', data: conceptInfo });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not update concept info." });
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
        res.json({ msg: 'Work packages', data: workPackages });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not get work packages." });
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

    let workPackage = new WorkPackages();
    workPackage.name = name;
    workPackage.results = results;
    workPackage.pathway_content = pathwayContent;
    workPackage.is_global = isGlobal;
    try {

        let initiativeStg = await initvStgRepo.findOneOrFail(initvStgId);
        workPackage.initvStg = initiativeStg;

        const errors = await validate(workPackage);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        workPackage = await wpRepo.save(workPackage);

        res.json({ msg: 'Work package created', data: workPackage });

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
    const { id, name, results, pathwayContent, isGlobal } = req.body;
    const wpRepo = getRepository(WorkPackages);

    let workPackage = new WorkPackages();
    try {

        workPackage = await wpRepo.findOneOrFail(id);
        workPackage.results = (results) ? results : workPackage.results;
        workPackage.name = (name) ? name : workPackage.name;
        workPackage.pathway_content = (pathwayContent) ? pathwayContent : workPackage.pathway_content;
        workPackage.is_global = (isGlobal) ? isGlobal : workPackage.is_global;

        const errors = await validate(workPackage);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        workPackage = await wpRepo.save(workPackage);

        res.json({ msg: 'Work package updated', data: workPackage });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not update work package." });
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
        // const l = await getClaActionAreas();
        // console.log(l);

        const regions = await regionRepo.find({ where: { wrkPkg: workPackage, active: 1 } });
        const countries = await countryRepo.find({ where: { wrkPkg: workPackage, active: 1 } });

        res.json({ msg: 'Regions / countries by work package', data: { regions, countries } });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not get regions / countries from work package.", data: error });
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
            return res.status(400).json(errors);
        }
        let region = await regionRepo.save(wrkRegion);

        res.json({ msg: 'Work package region updated.', data: { region } });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not update region in work package.", data: error });
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

    let cntryRegion: CountriesByWorkPackages;

    try {
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
            return res.status(400).json(errors);
        }
        let country = await regionRepo.save(cntryRegion);

        res.json({ msg: 'Work package country updated.', data: { country } });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not update country in work package.", data: error });
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
        res.json({ msg: 'Projected benefits from work package', data: { projectedBenefits } });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not get projected benefit from work package.", data: error });
    }
}


/**
 * 
 * @param req params: { id, wrkPkgId, impactAreaIndicatorId, impactAreaIndicatorName, notes, impactAreaId, impactAreaName }
 * @param res 
 */
export const upsertProjectedBenefitWorkPackage = async (req: Request, res: Response) => {
    const { id, wrkPkgId, impactAreaIndicatorId, impactAreaIndicatorName, notes, impactAreaId, impactAreaName, active } = req.body;
    const prjBfnRepo = getRepository(ProjectionBenefits);
    const wpRepo = getRepository(WorkPackages);
    let prjtedBfnt: ProjectionBenefits;
    try {


        if (id) {
            prjtedBfnt = await prjBfnRepo.findOne({ where: { id: id, wrkPkg: wrkPkgId } });
            prjtedBfnt.notes = (notes) ? notes : prjtedBfnt.notes;
            prjtedBfnt.active = (active) ? active : prjtedBfnt.active;
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
            return res.status(400).json(errors);
        }

        let projectedBenefit = await prjBfnRepo.save(prjtedBfnt);

        res.json({ msg: 'Projected benefit added to work package', data: { projectedBenefit } });


    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not add projected benefit to work package.", data: error });
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
        res.json({ msg: 'Time frames from projected benefit', data: { timeFrames } });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not get time frames from projected benefit.", data: error });
    }
}


/**
 * 
 * @param req params: { id, prjtBenefitId, year, lowScenario, highScenario, active }
 * @param res 
 */
export const upsertTimeFrameProjectedBenefit = async (req: Request, res: Response) => {
    const { id, prjtBenefitId, year, lowScenario, highScenario, active } = req.body;
    const prjBfnRepo = getRepository(ProjectionBenefits);
    const tfRepo = getRepository(ImpactTimeFrames);

    let timeFrame: ImpactTimeFrames;

    try {

        const prjtBnefit = await prjBfnRepo.findOne(prjtBenefitId);

        if (id) {
            timeFrame = await tfRepo.findOne(id);
            timeFrame.active = (active) ? active : timeFrame.active;
            timeFrame.high_scenario = (highScenario) ? highScenario : timeFrame.high_scenario;
            timeFrame.low_scenario = (lowScenario) ? lowScenario : timeFrame.low_scenario;
            timeFrame.year = (year) ? year : timeFrame.year;
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
            return res.status(400).json(errors);
        }

        let impactTimeFrame = await tfRepo.save(timeFrame);

        res.json({ msg: 'Impact time frame added to projected benefit', data: { impactTimeFrame } });



    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not add impact time frame to projected benefit.", data: error });
    }

}











/**
 * 
 * @param req params:{ initvStgId, narrative }
 * @param res 
 */
export const addTOCConcept = async (req: Request, res: Response) => {
    const { initvStgId, narrative } = req.body;
    const tocsRepo = getRepository(TOCs);
    const initvStgRepo = getRepository(InitiativesByStages);
    const filesRepo = getRepository(Files);

    const newTOC = new TOCs();

    try {
        let iniStg = await initvStgRepo.findOne(initvStgId);
        newTOC.narrative = narrative;
        newTOC.initvStg = iniStg;

        let TOC = await tocsRepo.save(newTOC);
        const files = req['files'];

        if (files) {

            let filesArr = [];
            for (let index = 0; index < files.length; index++) {
                const element = files[index];
                filesArr.push(
                    {
                        active: true,
                        url: element.path,
                        name: element.originalname
                    }
                )
            }
            const _files = filesRepo.create(filesArr);
            _files.forEach(file => {
                file.tocs = TOC;
            });
            let Files = await filesRepo.save(_files);

            res.status(200).json({ msg: "TOC added to concept", data: { TOC, Files } });
        } else {
            throw new Error('None files found');
        }

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not add TOC file in concept.", data: error });
    }
}

/**
 * 
 * @param req params:{ tocId, narrative }
 * @param res 
 */
export const updateTOCConcept = async (req: Request, res: Response) => {
    const { tocId, narrative } = req.body;
    const tocsRepo = getRepository(TOCs);

    try {
        const toc = await tocsRepo.findOneOrFail(tocId);
        toc.narrative = narrative;

        let _toc = await tocsRepo.save(toc);
        res.status(200).json({ msg: "TOC narrative updated in concept", data: { _toc } });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not update TOC narrative in concept.", data: error });
    }

}


/**
 * 
 * @param req params:{ tocId }
 * @param res 
 */
export const addTOCFile = async (req: Request, res: Response) => {
    const { tocId } = req.body;
    const tocsRepo = getRepository(TOCs);
    const filesRepo = getRepository(Files);

    try {
        const TOC = await tocsRepo.findOneOrFail(tocId);
        const files = req['files'];

        if (files) {

            let filesArr = [];
            for (let index = 0; index < files.length; index++) {
                const element = files[index];
                filesArr.push(
                    {
                        active: true,
                        url: element.path,
                        name: element.originalname
                    }
                )
            }
            const _files = filesRepo.create(filesArr);
            _files.forEach(file => {
                file.tocs = TOC;
            });
            let Files = await filesRepo.save(_files);

            res.status(200).json({ msg: "File added to TOC", data: { TOC, Files } });
        } else {
            throw new Error('None files found');
        }

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not add file to TOC.", data: error });
    }

}

/**
 * 
 * @param req params:{ tocId }
 * @param res 
 */
export const getTOCFiles = async (req: Request, res: Response) => {
    const { tocId } = req.params;
    const filesRepo = getRepository(Files);

    try {
        const Files = await filesRepo.find({ where: { tocs: tocId } })
        res.status(200).json({ msg: "TOC files", data: { Files } });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not get files from TOC.", data: error });
    }
}

/**
 * 
 * @param req params:{ fileId, active, url, name }
 * @param res 
 */
export const updateTOCFile = async (req: Request, res: Response) => {
    const { fileId, active, url, name } = req.body;
    const filesRepo = getRepository(Files);

    try {
        const file = await filesRepo.findOneOrFail(fileId);
        file.active = (active) ? active : file.active;
        file.url = (url) ? url : file.url;
        file.name = (name) ? name : file.name;

        let Files = await filesRepo.save(file);
        res.status(200).json({ msg: "File updated in TOC.", data: { Files } });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not update file in TOC.", data: error });
    }

}