import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {InitiativesByStages} from '../entity/InititativesByStages';
import {Stages} from '../entity/Stages';
import {BaseError} from '../handlers/BaseError';
import {ConceptHandler} from '../handlers/ConceptDomain';
import {ResponseHandler} from '../handlers/Response';

const currentStage = 'Pre Concept';

/**
 * GENERAL INFORMATION FOR STAGE 2 PRECONCEPT
 * @param req initiativeId
 * @param res  { generalInformation }
 * @returns  { generalInformation }
 */

export async function getGeneralInformation(req: Request, res: Response) {
  // get initiative by stage id from client
  const {initiativeId} = req.params;
  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);
  try {
    // get stage
    const stage = await stageRepo.findOne({
      where: {description: 'Pre Concept'}
    });
    // get intiative by stage : proposal
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    // if not intitiative by stage, throw error
    if (initvStg == null) {
      throw new BaseError(
        'Read General information: Error',
        400,
        `Initiative not found in stage: ${stage.description}`,
        false
      );
    }

    // create new full proposal object
    const concept = new ConceptHandler(initvStg.id.toString());

    // get general information from porposal object
    const generalInformation = await concept.getGeneralInformation();

    // and filter by section
    // metadata = metadata.filter(meta => meta.group_by == 'General Information');

    res.json(
      new ResponseHandler('Pre Concept: General information.', {
        generalInformation
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * UPSERT GENERAL INFORMATION
 * @param req params: {  initiativeId, generalInformationId, name, action_area_id, action_area_description }
 * @param res
 */

export async function upsertConceptGeneralInformation(
  req: Request,
  res: Response
) {
  // get initiative by stage id from client
  const {initiativeId} = req.params;
  // get generalInformationId, name, action_area_id, action_area_description by stage id from client
  const {
    generalInformationId,
    name,
    action_area_id,
    action_area_description,
    acronym
  } = req.body;

  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);
  try {
    // get stage
    const stage = await stageRepo.findOne({where: {description: currentStage}});
    // get intiative by stage : concept
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    if (initvStg == null) {
      throw new BaseError(
        'Upsert General information: Error',
        400,
        `Initiative not found in stage: ${stage.description}`,
        false
      );
    }
    // create new concept object
    const concept = new ConceptHandler(initvStg.id.toString());

    const generalInformation = await concept.upsertGeneralInformation(
      generalInformationId,
      name,
      action_area_id,
      action_area_description,
      acronym
    );

    // get metadata
    let metadata = await concept.metaData;
    // and filter by section
    metadata = metadata.filter(
      (meta) => meta.group_by == 'General Information'
    );

    res.json(
      new ResponseHandler('Pre Concept: General information.', {
        generalInformation,
        metadata
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * GET NARRATIVES
 * @param req initiativeId
 * @param res  { narratives }
 * @returns  { narratives }
 */

export const getConceptNarratives = async (req: Request, res: Response) => {
  // get initiative by stage id from client
  const {initiativeId} = req.params;
  console.log(initiativeId);
  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);
  try {
    // get stage
    const stage = await stageRepo.findOne({where: {description: currentStage}});
    console.log(stage);
    // get intiative by stage : concept
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });

    // if not intitiative by stage, throw error
    if (initvStg == null) {
      throw new BaseError(
        'Narratives : Error',
        400,
        `Initiative not found in stage: ${stage.description}`,
        false
      );
    }

    // create new Concept object
    const concept = new ConceptHandler(initvStg.id.toString());

    // get narratives from concept object
    const narratives = await concept.getNarratives();

    // get metadata
    let metadata = await concept.metaData;
    // and filter by section
    metadata = metadata.filter((meta) => meta.group_by == 'Narratives');

    res.json(
      new ResponseHandler('Narratives : Concept', {narratives, metadata})
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
};

/**
 * UPSERT NARRATIVES
 * @param req params: {  initiativeId, narrativeId, challenge, objectives, results, highlights }
 * @param res
 */

export const upsertConceptNarratives = async (req: Request, res: Response) => {
  // get initiative by stage id from client
  const {initiativeId} = req.params;
  // get narrativeId, challenge, objectives, results, highlights by stage id from client
  const {narrativeId, challenge, objectives, results, highlights} = req.body;

  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);
  try {
    // get stage
    const stage = await stageRepo.findOne({where: {description: currentStage}});
    // get intiative by stage : concept
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    if (initvStg == null) {
      throw new BaseError(
        'Upsert Narratives : Error',
        400,
        `Initiative not found in stage: ${stage.description}`,
        false
      );
    }
    // create new concept object
    const concept = new ConceptHandler(initvStg.id.toString());

    const narratives = await concept.upsertNarratives(
      narrativeId,
      challenge,
      objectives,
      results,
      highlights
    );

    // get metadata
    let metadata = await concept.metaData;
    // and filter by section
    metadata = metadata.filter((meta) => meta.group_by == 'Narratives');

    res.json(
      new ResponseHandler('Concept: Narratives.', {narratives, metadata})
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
};

/**
 * UPSERT INITIAL TOC
 * @param req
 * @param res
 * @returns
 */
export async function upsertIntialToc(req: Request, res: Response) {
  const {initiativeId, ubication} = req.params;

  const {id, narrative, active, section, updateFiles} = req.body.data
    ? JSON.parse(req.body.data)
    : req.body;

  //Initial Toc files
  const files = req['files'];

  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    // get stage
    const stage = await stageRepo.findOne({where: {description: currentStage}});
    // get intiative by stage : Pre Concept
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    if (initvStg == null) {
      throw new BaseError(
        'Upsert General information: Error',
        400,
        `Initiative not found in stage: ${stage.description}`,
        false
      );
    }

        // create new concept object
        const concept = new ConceptHandler(initvStg.id.toString());

        const initialToc = await concept.upsertIntialToc(
          initiativeId,ubication,id, narrative, active, section, updateFiles
  
        );

        res.json(
          new ResponseHandler('Pre Concept: Initial Toc.', {
            initialToc
          })
        );

  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

//              ----------------------------                TO UPDATE             -------------------------------------            //

// /**
//  *
//  * @param req params: { conceptId, initvStgId, challenge, results, highlights, objectives }
//  * @param res
//  */
// export const upsertConceptNarratives = async (req: Request, res: Response) => {

//     const { conceptId, initvStgId, challenge, results, highlights, objectives } = req.body;
//     const concptInfoRepo = getRepository(ConceptInfo);
//     const initvStgRepo = getRepository(InitiativesByStages);
//     const queryRunner = getConnection().createQueryBuilder();

//     let conceptInf: ConceptInfo;

//     try {
//         const initvStg = await initvStgRepo.findOne(initvStgId, { relations: ['initiative'] });
//         if (initvStg == null) {
//             throw new APIError('NOT FOUND', HttpStatusCode.NOT_FOUND, true, 'Initiative not found for current stage.')
//         }

//         if (conceptId == null) {
//             conceptInf = new ConceptInfo();
//             conceptInf.name = '';
//             conceptInf.action_area_description = '';
//             conceptInf.action_area_id = null;
//             conceptInf.initvStg = initvStg;
//             conceptInf.objectives = objectives;
//             conceptInf.challenge = challenge;
//             conceptInf.results = results;
//             conceptInf.highlights = highlights;
//         } else {
//             conceptInf = await concptInfoRepo.findOne(conceptId);
//             conceptInf.challenge = (challenge) ? challenge : conceptInf.challenge;
//             conceptInf.results = (results) ? results : conceptInf.results;
//             conceptInf.objectives = (objectives) ? objectives : conceptInf.objectives;
//             conceptInf.results = (results) ? results : conceptInf.results;
//             conceptInf.highlights = (highlights) ? highlights : conceptInf.highlights;
//         }

//         let upsertedInfo = await concptInfoRepo.save(conceptInf);

//         let conceptQuery = `
//         SELECT
//             initvStgs.id AS initvStgId,
//             stage.description AS stageDesc,
//             stage.active AS stageIsActive,
//             concept.id AS conceptId,
//             concept.challenge AS conceptChallenge,
//             concept.objectives AS conceptObjectives,
//             concept.results AS conceptResults,
//             concept.highlights AS conceptHiglights
//         FROM
//             initiatives_by_stages initvStgs
//         LEFT JOIN stages stage ON stage.id = initvStgs.stageId
//         LEFT JOIN concept_info concept ON concept.initvStgId = initvStgs.initiativeId

// 		WHERE concept.id =:conceptId;
//     `;
//         const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
//             conceptQuery,
//             { conceptId: conceptInf.id },
//             {}
//         );
//         let narratives = await queryRunner.connection.query(query, parameters);

//         // console.log(narratives)

//         res.json(new ResponseHandler('Concept narratives upserted.', { narratives: narratives[0] }));

//     } catch (error) {
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }

// }

// /**
//  *
//  * @param req params: { initvStgId }
//  * @param res
//  */
// export const getWorkPackages = async (req: Request, res: Response) => {
//     const { initvStgId } = req.params;
//     const wpRepo = getRepository(WorkPackages);
//     const queryRunner = getConnection().createQueryBuilder();

//     try {
//         const sqlQuery = `
//         SELECT id, name, active, acronym,
//             IF (
//                 name IS NULL
//                 OR name = ''
//                 OR results IS NULL
//                 OR results = ''
//                 OR pathway_content IS NULL
//                 OR pathway_content = '',
//                 'incomplete',
//                 'complete'
//             ) AS validateGeneralInformation,
//             IF (
//                 ( SELECT COUNT(id) FROM countries_by_work_packages WHERE wrkPkgId = wp.id ) = 0
//                 AND
//                 (  SELECT COUNT(id) FROM regions_by_work_packages  WHERE wrkPkgId = wp.id  ) = 0,
//                 'incomplete',
//                 'complete'
//             ) AS validateGeographicScope,
//             IF(
//                 ( SELECT COUNT(id) FROM projection_benefits WHERE wrkPkgId = wp.id ) = 0,
//                 'incomplete',
//                 'complete'
//             ) AS validateProjectionBenefits
//         FROM work_packages wp
//         WHERE wp.initvStgId =:initvStgId
//         AND wp.active = 1`

//         const [query, parameters] = await queryRunner.connection.driver.escapeQueryWithParameters(
//             sqlQuery,
//             { initvStgId },
//             {}
//         );
//         const workPackages = await queryRunner.connection.query(query, parameters);
//         // await wpRepo.find({ where: { initvStg: initvStgId, active: 1 } });
//         // if (workPackages.length == 0) {
//         //     throw new APIError(
//         //         'NOT FOUND',
//         //         HttpStatusCode.NOT_FOUND,
//         //         true,
//         //         'Workpackages not found for initiative.'
//         //     );
//         // } else {
//         // }
//         res.json(new ResponseHandler('Work packages.', { workPackages }));
//     } catch (error) {
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }
// }

// /**
//  *
//  * @param req params: { wrkPkgId }
//  * @param res
//  */
// export const getWorkPackage = async (req: Request, res: Response) => {
//     const { wrkPkgId } = req.params;
//     const wpRepo = getRepository(WorkPackages);

//     try {
//         const workPackage = await wpRepo.findOne({ where: { id: wrkPkgId, active: 1 } });
//         if (workPackage == null) {
//             throw new APIError(
//                 'NOT FOUND',
//                 HttpStatusCode.NOT_FOUND,
//                 true,
//                 'Workpackage not found.'
//             );
//         } else {
//             res.json(new ResponseHandler('Work package.', { workPackage }));
//         }
//     } catch (error) {
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }
// }

// /**
//  *
//  * @param req params: { name, results, pathway_content, is_global, initvStgId }
//  * @param res
//  */
// export const createWorkPackage = async (req: Request, res: Response) => {
//     const { name, results, pathwayContent, isGlobal, acronym, initvStgId } = req.body;
//     const initvStgRepo = getRepository(InitiativesByStages);
//     const wpRepo = getRepository(WorkPackages);

//     try {
//         let workPackage = new WorkPackages();
//         workPackage.name = name || null;
//         workPackage.acronym = acronym || null;
//         workPackage.results = results || null;
//         workPackage.pathway_content = pathwayContent || null;
//         workPackage.is_global = isGlobal || null;

//         let initiativeStg = await initvStgRepo.findOne(initvStgId);
//         workPackage.initvStg = initiativeStg;

//         const errors = await validate(workPackage);
//         if (errors.length > 0) {
//             const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
//             throw new APIError(
//                 'BAD REQUEST',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 message
//             );
//         }

//         workPackage = await wpRepo.save(workPackage);

//         res.json(new ResponseHandler('Work package created.', { workPackage }));

//     } catch (error) {
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }
// }

// /**
//  *
//  * @param req params: { id, name, results, pathway_content, is_global }
//  * @param res
//  */
// export const updateWorkPackage = async (req: Request, res: Response) => {
//     const { id, name, results, pathwayContent, isGlobal, active, acronym } = req.body;
//     const wpRepo = getRepository(WorkPackages);

//     try {
//         let workPackage = new WorkPackages();
//         workPackage = await wpRepo.findOne(id);
//         workPackage.results = (results) ? results : workPackage.results;
//         workPackage.name = (name) ? name : workPackage.name;
//         workPackage.pathway_content = (pathwayContent) ? pathwayContent : workPackage.pathway_content;
//         workPackage.is_global = isGlobal;
//         workPackage.active = (active != null) ? active : workPackage.active;
//         workPackage.acronym = acronym || null;

//         const errors = await validate(workPackage);
//         if (errors.length > 0) {
//             const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
//             throw new APIError(
//                 'BAD REQUEST',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 message
//             );
//         }

//         workPackage = await wpRepo.save(workPackage);

//         res.json(new ResponseHandler('Work package updated.', { workPackage }));

//     } catch (error) {
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }

// }

// /**
//  *
//  * @param req params: { wrkPkgId }
//  * @param res
//  */
// export const getRegionWorkPackage = async (req: Request, res: Response) => {

//     const { wrkPkgId } = req.params;

//     const wpRepo = getRepository(WorkPackages);
//     const regionRepo = getRepository(RegionsByWorkPackages);
//     const countryRepo = getRepository(CountriesByWorkPackages);
//     const queryRunner = getConnection().createQueryBuilder();

//     try {
//         const workPackage = await wpRepo.findOne(wrkPkgId);
//         let regionsSBT = await regionRepo.find({ where: { wrkPkg: workPackage, active: 1 } });
//         let countriesSBT = await countryRepo.find({ where: { wrkPkg: workPackage, active: 1 } });

//         const inRegions = regionsSBT.length > 0 ? `IN (${regionsSBT.map(r => r.region_id)})` : `IN ('')`;
//         const inCountries = countriesSBT.length > 0 ? `IN (${countriesSBT.map(r => r.country_id)})` : `IN ('')`;

//         const regions = await getClaRegions();
//         const countries = await getClaCountries();
//         res.json(new ResponseHandler('Regions / countries by work package.', { regions, countries }));

//     } catch (error) {
//         console.log(error)
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }

// }

// /**
//  *
//  * @param req params:  { wrkPkgId, regionId, active }
//  * @param res
//  */
// export const upsertRegionWorkPackage = async (req: Request, res: Response) => {
//     const { wrkPkgId, regionId, active } = req.body;
//     const wpRepo = getRepository(WorkPackages);
//     const regionRepo = getRepository(RegionsByWorkPackages);

//     let wrkRegion: RegionsByWorkPackages;

//     try {
//         const workPackage = await wpRepo.findOne(wrkPkgId);
//         if (workPackage == null) {
//             throw new APIError(
//                 'NOT FOUND',
//                 HttpStatusCode.NOT_FOUND,
//                 true,
//                 'Work package not found'
//             );
//         }

//         wrkRegion = await regionRepo.findOne({ where: { region_id: regionId, wrkPkg: workPackage } });
//         if (wrkRegion) {
//             wrkRegion.active = active;
//         } else {
//             wrkRegion = new RegionsByWorkPackages();
//             wrkRegion.active = active;
//             wrkRegion.wrkPkg = workPackage;
//             wrkRegion.region_id = regionId;
//         }

//         const errors = await validate(wrkRegion);
//         if (errors.length > 0) {
//             const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
//             throw new APIError(
//                 'BAD REQUEST',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 message
//             );
//         } else {
//             let region = await regionRepo.save(wrkRegion);

//             res.json(new ResponseHandler('Work package region updated.', { region }));

//         }

//     } catch (error) {
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }
// }

// /**
//  *
//  * @param req params:  { wrkPkgId, countryId, active }
//  * @param res
//  */
// export const upsertCountryWorkPackage = async (req: Request, res: Response) => {
//     const { wrkPkgId, countryId, active } = req.body;
//     const wpRepo = getRepository(WorkPackages);
//     const countryRepo = getRepository(CountriesByWorkPackages);

//     try {
//         let cntryWP: CountriesByWorkPackages;
//         const workPackage = await wpRepo.findOne(wrkPkgId);
//         if (workPackage == null) {
//             throw new APIError(
//                 'NOT FOUND',
//                 HttpStatusCode.NOT_FOUND,
//                 true,
//                 'Work package not found'
//             );
//         }

//         cntryWP = await countryRepo.findOne({ where: { country_id: countryId, wrkPkg: workPackage } });
//         if (cntryWP) {
//             cntryWP.active = active;
//         } else {
//             cntryWP = new CountriesByWorkPackages();
//             cntryWP.active = active;
//             cntryWP.wrkPkg = workPackage;
//             cntryWP.country_id = countryId;
//         }

//         const errors = await validate(cntryWP);
//         if (errors.length > 0) {
//             const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
//             throw new APIError(
//                 'BAD REQUEST',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 message
//             );
//         } else {
//             let country = await countryRepo.save(cntryWP);
//             res.json(new ResponseHandler('Work package country updated.', { country }));
//         }

//     } catch (error) {
//         console.log(error);
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }
// }

// /**
//  *
//  * @param req params: { wrkPkgId }
//  * @param res
//  */
// export const getProjectedBenefitWorkPackage = async (req: Request, res: Response) => {
//     const { wrkPkgId } = req.params;
//     const pbRepo = getRepository(ProjectionBenefits);

//     try {
//         const projectedBenefits = await pbRepo.find({ where: { wrkPkg: wrkPkgId, active: true } });
//         if (projectedBenefits.length == 0) {
//             throw new APIError(
//                 'NOT FOUND',
//                 HttpStatusCode.NOT_FOUND,
//                 true,
//                 'Projection benefits not found.'
//             );
//         } else {
//             res.json(new ResponseHandler('Projected benefits from work package.', { projectedBenefits }));
//         }

//     } catch (error) {
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }
// }

// /**
//  *
//  * @param req params: { id, wrkPkgId, impact_area_indicator_id, impact_area_indicator_name, notes, impact_area_id, impact_area_name }
//  * @param res
//  */
// export const upsertProjectedBenefitWorkPackage = async (req: Request, res: Response) => {
//     const { id, wrkPkgId, impact_area_indicator_id, impact_area_indicator_name, notes, impact_area_id, impact_area_name, active } = req.body;
//     try {
//         const prjBfnRepo = getRepository(ProjectionBenefits);
//         const wpRepo = getRepository(WorkPackages);
//         let prjtedBfnt: ProjectionBenefits;

//         if (id) {
//             prjtedBfnt = await prjBfnRepo.findOne({ where: { id: id, wrkPkg: wrkPkgId } });
//             prjtedBfnt.notes = (notes) ? notes : prjtedBfnt.notes;
//             prjtedBfnt.active = active;
//             // prjtedBfnt.active = (active) ? active : prjtedBfnt.active;
//             prjtedBfnt.impact_area_indicator_id = (impact_area_indicator_id) ? impact_area_indicator_id : prjtedBfnt.impact_area_indicator_id;
//             prjtedBfnt.impact_area_indicator_name = (impact_area_indicator_name) ? impact_area_indicator_name : prjtedBfnt.impact_area_indicator_name;
//         } else {
//             prjtedBfnt = new ProjectionBenefits();
//             const workPackage = await wpRepo.findOne(wrkPkgId);
//             prjtedBfnt.notes = notes;
//             prjtedBfnt.impact_area_id = impact_area_id;
//             prjtedBfnt.impact_area_indicator_id = impact_area_indicator_id;
//             prjtedBfnt.impact_area_indicator_name = impact_area_indicator_name;
//             prjtedBfnt.impact_area_name = impact_area_name;
//             prjtedBfnt.wrkPkg = workPackage;
//             prjtedBfnt.active = active;
//         }

//         const errors = await validate(prjtedBfnt);
//         if (errors.length > 0) {
//             const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
//             throw new APIError(
//                 'BAD REQUEST',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 message
//             );
//         }

//         let projectedBenefit = await prjBfnRepo.save(prjtedBfnt);

//         res.json(new ResponseHandler('Projected benefit added to work package.', { projectedBenefit }));

//     } catch (error) {
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }
// }

// /**
//  *
//  * @param req params: { prjctBnftId }
//  * @param res
//  */
// export const getTimeFramesProjectedBenefit = async (req: Request, res: Response) => {
//     const { prjctBnftId } = req.params;
//     const tfRepo = getRepository(ImpactTimeFrames);

//     try {
//         const timeFrames = await tfRepo.find({ where: { proBnft: prjctBnftId, active: true } });
//         if (timeFrames.length == 0) {
//             throw new APIError(
//                 'NOT FOUND',
//                 HttpStatusCode.NOT_FOUND,
//                 true,
//                 'Time frames not found.'
//             );
//         } else {
//             res.json(new ResponseHandler('Time frames from projected benefit.', { timeFrames }));
//         }
//     } catch (error) {
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }
// }

// /**
//  *
//  * @param req params: { id, prjtBenefitId, year, lowScenario, highScenario, active }
//  * @param res
//  */
// export const upsertTimeFrameProjectedBenefit = async (req: Request, res: Response) => {
//     const { id, prjtBenefitId, year, lowScenario, highScenario, active } = req.body;

//     try {
//         const prjBfnRepo = getRepository(ProjectionBenefits);
//         const tfRepo = getRepository(ImpactTimeFrames);

//         let timeFrame: ImpactTimeFrames;

//         const prjtBnefit = await prjBfnRepo.findOne(prjtBenefitId);

//         if (id) {
//             timeFrame = await tfRepo.findOne(id);
//             if (!timeFrame) {
//                 throw new APIError(
//                     'NOT FOUND',
//                     HttpStatusCode.NOT_FOUND,
//                     true,
//                     'Time frames not found.'
//                 );
//             } else {
//                 timeFrame.active = active;
//                 // timeFrame.active = (active) ? active : timeFrame.active;
//                 timeFrame.high_scenario = (highScenario) ? highScenario : timeFrame.high_scenario;
//                 timeFrame.low_scenario = (lowScenario) ? lowScenario : timeFrame.low_scenario;
//                 timeFrame.year = (year) ? year : timeFrame.year;
//             }
//         } else {
//             timeFrame = new ImpactTimeFrames();
//             timeFrame.proBnft = prjtBnefit;
//             timeFrame.active = active;
//             timeFrame.low_scenario = lowScenario;
//             timeFrame.high_scenario = highScenario;
//             timeFrame.proBnft = prjtBnefit;
//             timeFrame.year = year;
//         }

//         const errors = await validate(timeFrame);
//         if (errors.length > 0) {
//             const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
//             throw new APIError(
//                 'BAD REQUEST',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 message
//             );
//         }

//         let impactTimeFrame = await tfRepo.save(timeFrame);

//         // res.json({ msg: 'Impact time frame added to projected benefit', data: { impactTimeFrame } });
//         res.json(new ResponseHandler('Impact time frame added to projected benefit.', { impactTimeFrame }));
//     } catch (error) {
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }

// }

// /**
//  *
//  * @param req params:{ initvStgId, narrative }
//  * @param res
//  */
// export const addTOCConcept = async (req: Request, res: Response) => {
//     const { initvStgId, narrative } = req.body;

//     try {
//         const tocsRepo = getRepository(TOCs);
//         const initvStgRepo = getRepository(InitiativesByStages);
//         const filesRepo = getRepository(Files);

//         const newTOC = new TOCs();
//         let iniStg = await initvStgRepo.findOne(initvStgId);
//         newTOC.narrative = narrative;
//         newTOC.initvStg = iniStg;

//         let TOC = await tocsRepo.save(newTOC);
//         const files = req['files'];

//         if (files) {

//             let filesArr = [];
//             for (let index = 0; index < files.length; index++) {
//                 const element = files[index];
//                 // console.log(`${ __dirname } / `)
//                 console.log(`${host} / ${element.path}`)
//                 filesArr.push(
//                     {
//                         active: true,
//                         url: `${host} / ${element.path}`,
//                         name: element.originalname
//                     }
//                 )
//             }
//             const _files = filesRepo.create(filesArr);
//             _files.forEach(file => {
//                 file.tocs = TOC;
//             });
//             let Files = await filesRepo.save(_files);

//             res.json(new ResponseHandler('TOC added to concept.', { TOC, Files }));
//         } else {
//             throw new APIError(
//                 'NOT FOUND',
//                 HttpStatusCode.NOT_FOUND,
//                 true,
//                 'None files found.'
//             );
//         }

//     } catch (error) {
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }
// }

// /**
//  *
//  * @param req params:{ tocId }
//  * @param res
//  */
// export const upsertTOCandFile = async (req: Request, res: Response) => {
//     const { initvStgId, narrative, path } = req.body;
//     const tocsRepo = getRepository(TOCs);
//     const filesRepo = getRepository(Files);

//     try {
//         let existingTOC = await tocsRepo.findOne({ where: { initvStg: initvStgId } });
//         const files = req['files'];
//         if (existingTOC == null) {
//             existingTOC = new TOCs();
//             existingTOC.narrative = (narrative == 'null' || narrative == null) ? null : narrative;
//             existingTOC.initvStg = initvStgId;
//         } else {
//             existingTOC.narrative = (narrative) ? narrative : existingTOC.narrative;
//         }
//         const TOC = await tocsRepo.save(existingTOC);

//         if (files) {

//             let filesArr = [];
//             for (let index = 0; index < files.length; index++) {
//                 const element = files[index];
//                 const urlDB = `${host} / ${path} / ${element.originalname}`
//                 filesArr.push(
//                     {
//                         active: true,
//                         url: urlDB,
//                         name: element.originalname
//                     }
//                 )
//             }
//             const _files = filesRepo.create(filesArr);
//             _files.forEach(file => {
//                 file.tocs = TOC;
//             });
//             let Files = await filesRepo.save(_files);
//             res.json(new ResponseHandler('File added to TOC.', { TOC: TOC, Files }));
//         } else {
//             throw new APIError(
//                 'NOT FOUND',
//                 HttpStatusCode.NOT_FOUND,
//                 true,
//                 'None files found.'
//             );
//         }

//     } catch (error) {
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }

// }

// /**
//  *
//  * @param req params:{ initvStgId }
//  * @param res
//  */
// export const getTOCFiles = async (req: Request, res: Response) => {
//     const { initvStgId } = req.params;
//     const tocRepo = getRepository(TOCs);
//     // const initvStgRepo = getRepository(InitiativesByStages);
//     const filesRepo = getRepository(Files);

//     try {
//         let TOC = await tocRepo.findOne({ where: { initvStg: initvStgId } });

//         if (TOC == null) {
//             res.json(new ResponseHandler('TOC and files.', { TOC }));
//         } else {
//             const Files = await filesRepo.find({ where: { tocs: TOC.id, active: 1 } });
//             // console.log(Files)
//             if (Files.length > 0) {
//                 TOC['files'] = Files;
//             }

//             res.json(new ResponseHandler('TOC and files.', { TOC }));

//         }
//     } catch (error) {
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }
// }

// /**
//  *
//  * @param req params:{ fileId, active, url, name }
//  * @param res
//  */
// export const updateTOCFile = async (req: Request, res: Response) => {
//     const { id, active, url, name } = req.body;
//     const filesRepo = getRepository(Files);

//     try {
//         const file = await filesRepo.findOne(id);
//         if (file == null) {
//             throw new APIError(
//                 'NOT FOUND',
//                 HttpStatusCode.NOT_FOUND,
//                 true,
//                 'Theory of change file not found.'
//             );
//         }
//         file.active = active;
//         file.url = (url) ? url : file.url;
//         file.name = (name) ? name : file.name;

//         let Files = await filesRepo.save(file);
//         res.json(new ResponseHandler('Files.', { Files }));
//     } catch (error) {
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }

// }

// /**
//  *
//  * @param req params:{ initvStgId, id, comparative_advantage, key_partners }
//  * @param res
//  */
// export const upsertPartnerships = async (req: Request, res: Response) => {
//     const { initvStgId, id, comparative_advantage, key_partners } = req.body;
//     const partRepo = getRepository(Partnerships);
//     const keyPartnersRepo = getRepository(KeyPartners);
//     const initvStgRepo = getRepository(InitiativesByStages);
//     let partnership: Partnerships;
//     try {
//         if (initvStgId == null) {
//             throw new APIError(
//                 'NOT FOUND',
//                 HttpStatusCode.NOT_FOUND,
//                 true,
//                 'None initiative by stage sent.'
//             );
//         }

//         const initvStg = await initvStgRepo.findOne(initvStgId);
//         if (id) {
//             partnership = await partRepo.findOne(id);
//             partnership.comparative_advantage = (comparative_advantage) ? comparative_advantage : partnership.comparative_advantage;
//         } else {
//             partnership = new Partnerships();
//             partnership.comparative_advantage = comparative_advantage;
//             partnership.initvStg = initvStg;
//         }

//         partnership = await partRepo.save(partnership);
//         console.log(key_partners)

//         key_partners.forEach(kp => {
//             kp['partnerships'] = partnership
//         });

//         let keyPartners = await keyPartnersRepo.save(key_partners);

//         res.json(new ResponseHandler('Key Partners updated.', { partnership, keyPartners }));

//     } catch (error) {
//         console.log(error)
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }
// }

// /**
//  *
//  * @param req params:{ initvStgId }
//  * @param res
//  */
// export const getPartnerships = async (req: Request, res: Response) => {
//     const { initvStgId } = req.params;
//     const partRepo = getRepository(Partnerships);
//     const keyPartnersRepo = getRepository(KeyPartners);
//     // const initvStgRepo = getRepository(InitiativesByStages);

//     let partnership: Partnerships, keyPartners: KeyPartners[];
//     try {
//         if (initvStgId == null) {
//             throw new APIError(
//                 'NOT FOUND',
//                 HttpStatusCode.NOT_FOUND,
//                 true,
//                 'None initiative by stage sent.'
//             );
//         }
//         partnership = await partRepo.findOne({ where: { initvStg: initvStgId } });
//         keyPartners = await keyPartnersRepo.find({ where: { partnerships: partnership, active: true } });

//         res.json(new ResponseHandler('Key Partners list.', { partnership, keyPartners }));

//     } catch (error) {
//         console.log(error)
//         let e = error;
//         if (error instanceof QueryFailedError || error instanceof EntityNotFoundError) {
//             e = new APIError(
//                 'Bad Request',
//                 HttpStatusCode.BAD_REQUEST,
//                 true,
//                 error.message
//             );
//         }
//         return res.status(error.httpCode).json(error);
//     }
// }
