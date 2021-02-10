import { validate } from 'class-validator';
import { Request, Response } from 'express'
import { getConnection, getRepository, In } from 'typeorm'
import { ConceptInfo } from '../entity/ConceptInfo';
import { CountriesByWorkPackages } from '../entity/CountriesByWorkPackages';
import { Files } from '../entity/Files';
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

            let createdconceptInf = await concptInfoRepo.save(conceptInf);
            res.json({ msg: 'Concept info created', data: createdconceptInf });
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
    const { id, name, challenge, objectives, results, highlights, action_area_id, action_area_description } = req.params;
    const concptInfoRepo = getRepository(ConceptInfo);

    let conceptInf = new ConceptInfo();

    try {
        conceptInf = await concptInfoRepo.findOneOrFail(id);
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

        let updatedconceptInf = await concptInfoRepo.save(conceptInf);
        res.json({ msg: 'Concept info updated', data: updatedconceptInf });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not update concept info." });
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
 * @param req params: { isGlobal, wrkPkgId, regionId, countryId }
 * @param res 
 */
export const addRegionWorkPackage = async (req: Request, res: Response) => {
    const { isGlobal, wrkPkgId, regionId, countryId } = req.body;
    const wpRepo = getRepository(WorkPackages);
    const regionRepo = getRepository(RegionsByWorkPackages);
    const countryRepo = getRepository(CountriesByWorkPackages);

    const wrkRegion = new RegionsByWorkPackages();
    const wrkCountry = new CountriesByWorkPackages();

    try {
        const workPackage = await wpRepo.findOneOrFail(wrkPkgId);
        workPackage.is_global = (isGlobal) ? isGlobal : workPackage.is_global;

        const errors = await validate(workPackage);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        wrkRegion.region_id = regionId;
        wrkRegion.wrkPkg = workPackage;

        wrkCountry.country_id = countryId;
        wrkCountry.wrkPkg = workPackage;

        let savedRegion = await regionRepo.save(wrkRegion);
        let savedCountry = await countryRepo.save(wrkCountry);

        res.json({ msg: 'Work package updated: Region / country added', data: { workPackage, savedRegion, savedCountry } });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not add region / country to work package.", data: error });
    }
}



/**
 * 
 * @param req params: { id, wrkPkgId, impactAreaIndicatorId, impactAreaIndicatorName, notes, impactAreaId, impactAreaName }
 * @param res 
 */
export const addProjectedBenefitWorkPackage = async (req: Request, res: Response) => {
    const { id, wrkPkgId, impactAreaIndicatorId, impactAreaIndicatorName, notes, impactAreaId, impactAreaName } = req.body;
    const prjBfnRepo = getRepository(ProjectionBenefits);
    const wpRepo = getRepository(WorkPackages);
    let prjtedBfnt: ProjectionBenefits;
    try {


        if (id) {
            prjtedBfnt = await prjBfnRepo.findOne(id);
            prjtedBfnt.notes = (notes) ? notes : prjtedBfnt.notes;
            prjtedBfnt.impact_area_id = (impactAreaId) ? impactAreaId : prjtedBfnt.impact_area_id;
            prjtedBfnt.impact_area_indicator_id = (impactAreaIndicatorId) ? impactAreaIndicatorId : prjtedBfnt.impact_area_indicator_id;
            prjtedBfnt.impact_area_indicator_name = (impactAreaIndicatorName) ? impactAreaIndicatorName : prjtedBfnt.impact_area_indicator_name;
            prjtedBfnt.impact_area_name = (impactAreaName) ? impactAreaName : prjtedBfnt.impact_area_name;
        } else {
            prjtedBfnt = new ProjectionBenefits();
            const workPackage = await wpRepo.findOneOrFail(wrkPkgId);
            prjtedBfnt.notes = notes;
            prjtedBfnt.impact_area_id = impactAreaId;
            prjtedBfnt.impact_area_indicator_id = impactAreaIndicatorId;
            prjtedBfnt.impact_area_indicator_name = impactAreaIndicatorName;
            prjtedBfnt.impact_area_name = impactAreaName;
            prjtedBfnt.wrkPkg = workPackage;
        }

        const errors = await validate(prjtedBfnt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        let svdPrjtdBfnt = await prjBfnRepo.save(prjtedBfnt);

        res.json({ msg: 'Projected benefit added to work package', data: { svdPrjtdBfnt } });


    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not add projected benefi to work package.", data: error });
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

        let svdTOC = await tocsRepo.save(newTOC);
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
                file.tocs = svdTOC;
            });
            let savdFiles = await filesRepo.save(_files);

            res.status(200).json({ msg: "TOC added to concept", data: { svdTOC, savdFiles } });
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
        const toc = await tocsRepo.findOneOrFail(tocId);
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
                file.tocs = toc;
            });
            let savdFiles = await filesRepo.save(_files);

            res.status(200).json({ msg: "File added to TOC", data: { toc, savdFiles } });
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
        const files = await filesRepo.find({ where: { tocs: tocId } })
        res.status(200).json({ msg: "TOC files", data: { files } });
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

        let _file = await filesRepo.save(file);
        res.status(200).json({ msg: "File updated in TOC.", data: { _file } });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Could not update file in TOC.", data: error });
    }

}