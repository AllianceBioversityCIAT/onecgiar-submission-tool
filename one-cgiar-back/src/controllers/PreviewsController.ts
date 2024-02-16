import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {InitiativesByStages} from '../entity/InititativesByStages';
import {Stages} from '../entity/Stages';
import {BaseError} from '../handlers/BaseError';
import {PreviewsDomain} from '../handlers/PreviewsDomain';
import {ResponseHandler} from '../handlers/Response';

/**
 * ****************************
 * PREVIEWS FOR PROPOSAL STAGES
 * ****************************
 */

/**
 * GET PREVIEW FOR PARTNERS SECTION
 * @param req { initiativeId, stageId }
 * @param res { previewPartners }
 * @returns
 */
export async function getPreviewPartners(req: Request, res: Response) {
  const {initiativeId, stageId} = req.params;
  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    // get stage
    const stage = await stageRepo.findOne({where: {id: stageId}});

    // get intiative by stage
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    // if not intitiative by stage, throw error
    if (initvStg == null || initvStg == undefined) {
      throw new BaseError(
        'Previews: Error',
        400,
        `Previews not found in stage:` + stageId,
        false
      );
    }

    // create new full proposal object
    const previewsdomain = new PreviewsDomain();

    const previewPartners = await previewsdomain.requestPreviewPartners(
      initvStg.id.toString()
    );

    res.json(
      new ResponseHandler('Previews:Get Partners per initiative', {
        previewPartners
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * GET PREVIEW FOR PROJECTED BENEFITS
 * @param req { initiativeId, stageId }
 * @param res { previewProjectedBenefits }
 * @returns
 */
export async function getPreviewProjectedBenefits(req: Request, res: Response) {
  const {initiativeId, stageId} = req.params;
  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    // get stage
    const stage = await stageRepo.findOne({where: {id: stageId}});

    // get intiative by stage
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    // if not intitiative by stage, throw error
    if (initvStg == null || initvStg == undefined) {
      throw new BaseError(
        'Previews: Error',
        400,
        `Previews not found in stage:` + stageId,
        false
      );
    }

    // create new full proposal object
    const previewsdomain = new PreviewsDomain();

    const previewProjectedBenefits =
      await previewsdomain.requestPreviewProjectedBenefits(
        initvStg.id.toString()
      );

    res.json(
      new ResponseHandler('Previews:Get Projected Benefits', {
        previewProjectedBenefits
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * GET PREVIEW FOR GEOGRAPHIC SCOPE
 * @param req { initiativeId, stageId }
 * @param res { previewGeographicScope }
 * @returns {Regions, Countries}
 */
export async function getPreviewGeographicScope(req: Request, res: Response) {
  const {initiativeId, stageId} = req.params;
  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    // get stage
    const stage = await stageRepo.findOne({where: {id: stageId}});

    // get intiative by stage
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    // if not intitiative by stage, throw error
    if (initvStg == null || initvStg == undefined) {
      throw new BaseError(
        'Previews: Error',
        400,
        `Previews not found in stage:` + stageId,
        false
      );
    }

    // create new full proposal object
    const previewsdomain = new PreviewsDomain();

    const previewGeographicScope =
      await previewsdomain.requestPreviewGeographicScope(
        initvStg.id.toString()
      );

    res.json(
      new ResponseHandler('Previews:Get Geographic Scope per initiative', {
        previewGeographicScope
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * GET ALL GEOGRAPHIC SCOPE
 * @param req { initiativeId, stageId }
 * @param res { previewGeographicScope }
 * @returns {Regions, Countries}
 */
export async function getAllGeographicScope(req: Request, res: Response) {
  const {initiativeId, stageId} = req.params;
  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    // get stage
    const stage = await stageRepo.findOne({where: {id: stageId}});

    // get intiative by stage
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    // if not intitiative by stage, throw error
    if (initvStg == null || initvStg == undefined) {
      throw new BaseError(
        'Previews: Error',
        400,
        `Previews not found in stage:` + stageId,
        false
      );
    }

    // create new full proposal object
    const previewsdomain = new PreviewsDomain();

    const previewGeographicScope =
      await previewsdomain.requestAllGeographicScope();

    res.json(
      new ResponseHandler('Previews:Get all Geographic Scope', {
        previewGeographicScope
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * GET PREVIEW FOR RISK ASSESSMENT
 * @param req { initiativeId, stageId }
 * @param res { previewRiskAssessment }
 * @returns previewRiskAssessment
 */
export async function getPreviewRiskAssessment(req: Request, res: Response) {
  const {initiativeId, stageId} = req.params;
  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    // get stage
    const stage = await stageRepo.findOne({where: {id: stageId}});

    // get initiative by stage
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    // if not initiative by stage, throw error
    if (initvStg == null || initvStg == undefined) {
      throw new BaseError(
        'Previews: Error',
        400,
        `Previews not found in stage:` + stageId,
        false
      );
    }

    // create new full proposal object
    const previewsdomain = new PreviewsDomain();

    const previewRiskAssessment =
      await previewsdomain.requestPreviewRiskAssessment(initvStg.id.toString());

    res.json(
      new ResponseHandler('Previews:Risk Assessment', {
        previewRiskAssessment
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * GET PREVIEW FOR HUMAN RESOURCES
 * @param req { initiativeId, stageId }
 * @param res { previewHumanResources }
 * @returns previewHumanResources
 */
export async function getPreviewHumanResources(req: Request, res: Response) {
  const {initiativeId, stageId} = req.params;
  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    // get stage
    const stage = await stageRepo.findOne({where: {id: stageId}});

    // get initiative by stage
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    // if not intitiative by stage, throw error
    if (initvStg == null || initvStg == undefined) {
      throw new BaseError(
        'Previews: Error',
        400,
        `Previews not found in stage:` + stageId,
        false
      );
    }

    // create new full proposal object
    const previewsdomain = new PreviewsDomain();

    const previewHumanResources =
      await previewsdomain.requestPreviewHumanResources(initvStg.id.toString());

    res.json(
      new ResponseHandler('Previews:Preview Human Resources', {
        previewHumanResources
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * GET PREVIEW FOR FINANCIAL RESOURCES
 * @param req { initiativeId, stageId }
 * @param res { previewFinancialResources }
 * @returns previewFinancialResources
 */
export async function getPreviewFinancialResources(
  req: Request,
  res: Response
) {
  const {initiativeId, stageId} = req.params;
  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    // get stage
    const stage = await stageRepo.findOne({where: {id: stageId}});

    // get intiative by stage
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, stage}
    });
    // if not intitiative by stage, throw error
    if (initvStg == null || initvStg == undefined) {
      throw new BaseError(
        'Previews: Error',
        400,
        `Previews not found in stage:` + stageId,
        false
      );
    }

    // create new full proposal object
    const previewsdomain = new PreviewsDomain();

    const previewFinancialResources =
      await previewsdomain.requestPreviewFinancialResources(
        initvStg.id.toString()
      );

    res.json(
      new ResponseHandler('Previews:Preview Financial Resources', {
        previewFinancialResources
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}

/**
 * GET PREVIEW WORK PACKAGE BY STAGE
 * @param req { initiativeId, stageId }
 * @param res { previewHumanResources }
 * @returns previewHumanResources
 */
export async function getPreviewWorkPackages(req: Request, res: Response) {
  const {initiativeId} = req.params;
  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    // get stage
    // const stage = await stageRepo.findOne({where: {id: stageId}});

    // get intiative by stage
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: {initiative: initiativeId, active: 1}
    });

    // if not intitiative by stage, throw error
    if (initvStg == null || initvStg == undefined) {
      throw new BaseError(
        'Previews: Error',
        400,
        `Previews not found in stage:` + initvStg?.stage?.id || 'Unknown Stage',
        false
      );
    }

    // create new full proposal object
    const previewsdomain = new PreviewsDomain();

    const previewWorkPackages = await previewsdomain.requestWorkPackages(
      initvStg.id.toString()
    );

    res.json(
      new ResponseHandler('Previews:Preview Work Packages', {
        previewWorkPackages
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(error.httpCode).json(error);
  }
}
