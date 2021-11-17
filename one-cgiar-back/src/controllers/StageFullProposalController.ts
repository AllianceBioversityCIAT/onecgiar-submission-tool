import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { InitiativesByStages } from '../entity/InititativesByStages';
import { InitiativeStageHandler } from '../handlers/InitiativeStageDomain';
import { Stages } from '../entity/Stages';
import { BaseError } from '../handlers/BaseError';
import { ProposalHandler } from '../handlers/FullProposalDomain';
import { ResponseHandler } from '../handlers/Response';
import { WorkPackages } from '../entity/WorkPackages';


/**
 * ***************************
 * SECTIONS FOR PROPOSAL STAGE
 * ***************************
 */


/**
 * GET GENERAL INFORMATION
 * @param req initiativeId
 * @param res  { generalInformation, metadata }
 * @returns  { generalInformation, metadata }
 */

export const getGeneralInformation = async (req: Request, res: Response) => {
    // get initiative by stage id from client
    const { initiativeId } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);
    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read General information: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }

        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        // get general information from porposal object
        const generalInformation = await fullPposal.getGeneralInformation();

        //set metadata
        fullPposal.metaData = "General Information";

        // get metadata
        let metadata = await fullPposal.metaData;

        // and filter by section
        // metadata = metadata.filter(meta => meta.group_by == 'General Information');

        res.json(new ResponseHandler('Full Proposal: General information.', { generalInformation, metadata }));
    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }
}


/**
 * GET ALL WORK PACKAGES
 * @param req 
 * @param res { workpackage }
 * @returns 
 */
export async function getWorkPackages(req: Request, res: Response) {

    const { initiativeId } = req.params;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {
        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read Workpackage: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }

        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        // get workpackage from porposal object
        const workpackage = await fullPposal.getWorkPackage();

        res.json(new ResponseHandler('Full Proposal: Workpackage.', { workpackage }));
    } catch (error) {
        return res.status(error.httpCode).json(error);
    }

}

/**
 * GET WORK PACKAGE
 * @param req 
 * @param res { workpackage }
 * @returns 
 */
export async function getWorkPackage(req: Request, res: Response) {

    const { wrkPkgId } = req.params;

    try {

        // create new full proposal object
        const fullPposal = new ProposalHandler();

        // get workpackage from porposal object
        const workpackage = await fullPposal.getWorkPackageId(wrkPkgId);

        res.json(new ResponseHandler('Full Proposal: Workpackage id.', { workpackage }));
    } catch (error) {
        return res.status(error.httpCode).json(error);
    }



}

/**
 * GET ALL WORK PACKAGES
 * @param req 
 * @param res { workpackages }
 * @returns 
 */
export async function getAllWorkPackages(req: Request, res: Response) {

    try {

        // create new full proposal object
        const fullPposal = new ProposalHandler();

        // get ALL workpackage from porposal
        const workpackages = await fullPposal.requestAllWorkPackages();

        res.json(new ResponseHandler('Full Proposal: All Work Package.', { workpackages }));
    } catch (error) {
        return res.status(error.httpCode).json(error);
    }

}

/**
 * PATCH WORK PACKAGES
 * @param req { acronym, name, pathway_content, is_global, id, regions, countries, active }
 * @param res { workpackage, upsertedGeoScope }
 * @returns 
 */
export async function patchWorkPackage(req: Request, res: Response) {

    const { initiativeId } = req.params;
    const { acronym, name, pathway_content, is_global, id, regions, countries, active } = req.body;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    var newWorkPackage = new WorkPackages();

    newWorkPackage.id = id;
    newWorkPackage.acronym = acronym;
    newWorkPackage.name = name;
    newWorkPackage.pathway_content = pathway_content;
    newWorkPackage.is_global = is_global;
    newWorkPackage.active = active;

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read Workpackage: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }

        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());
        const initvStgObj = new InitiativeStageHandler(initvStg.id.toString());

        // upsert workpackage from porposal object
        const workpackage = await fullPposal.upsertWorkPackages(newWorkPackage);

        const upsertedGeoScope = await initvStgObj.upsertGeoScopes(regions, countries);

        res.json(new ResponseHandler('Full Proposal: Patch Workpackage.', { workpackage, upsertedGeoScope }));


    } catch (error) {

        return res.status(error.httpCode).json(error);
    }

}

/**
 * PATCH GENERAL INFORMATION
 * @param req initiativeId, generalInformationId, name, action_area_id, action_area_description 
 * @param res { generalInformation, metadata }
 * @returns { generalInformation, metadata }
 */
export const upsertGeneralInformation = async (req: Request, res: Response) => {
    // get initiative by stage id from client
    const { initiativeId } = req.params;
    // get generalInformationId, name, action_area_id, action_area_description by stage id from client
    const { generalInformationId, name, action_area_id, action_area_description } = req.body;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);
    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        if (initvStg == null) {
            throw new BaseError('Upsert General information: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const generalInformation = await fullPposal.upsertGeneralInformation(generalInformationId, name, action_area_id, action_area_description)

        //set metadata
        fullPposal.metaData = "General Information";

        // get metadata
        let metadata = await fullPposal.metaData;
        // and filter by section
        // metadata = metadata.filter(meta => meta.group_by == 'General Information');

        res.json(new ResponseHandler('Full Proposal: General information.', { generalInformation, metadata }));
    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }
}


/**
 * GET CONTEXT
 * @param req initiativeId
 * @param res { context, metadata }
 * @returns  { context, metadata }
 */
export const getContext = async (req: Request, res: Response) => {
    // get initiative by stage id from client
    const { initiativeId } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);
    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read Context: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }

        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        // get context from porposal object
        const context = await fullPposal.getContext();

        //set metadata
        fullPposal.metaData = "Context";

        // get metadata
        let metadata = await fullPposal.metaData;
        // and filter by section
        // metadata = metadata.filter(meta => meta.group_by == 'Context');

        res.json(new ResponseHandler('Full Proposal: Context.', { context, metadata }));
    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }
}

/**
 * PATCH CONTEXT
 * @param req  contextId, challenge_statement, smart_objectives, key_learnings, priority_setting, comparative_advantage, participatory_design
 * @param res { context, metadata }
 * @returns { context, metadata }
 */

export const upsertContext = async (req: Request, res: Response, next) => {
    // get initiative by stage id from client
    const { initiativeId } = req.params;
    // get generalInformationId, name, action_area_id, action_area_description by stage id from client
    const { contextId, challenge_statement, smart_objectives, key_learnings, priority_setting, comparative_advantage, participatory_design } = req.body;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Upsert Context: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        // get context data
        const context = await fullPposal.upsertContext(contextId, challenge_statement, smart_objectives, key_learnings, priority_setting, comparative_advantage, participatory_design);

        //set metadata
        fullPposal.metaData = "Context";

        // get metadata
        let metadata = await fullPposal.metaData;
        // and filter by section
        // metadata = metadata.filter(meta => meta.group_by == 'Context');

        res.json(new ResponseHandler('Full Proposal: Context.', { context, metadata }));
        next();
    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }
}


/**
 * PATCH PROJECTED BENEFITS
 * @param req projectionBenefitsId, impact_area_id, impact_area_name, impact_area_indicator_id, impact_area_indicator_name,
        notes, depth_scale_id, probability_id, impact_area_active, active, dimensions
 * @param res { projectionBenefits }
 * @returns { projectionBenefits }
 */
export async function patchProjectionBenefits(req: Request, res: Response) {

    const { initiativeId } = req.params;

    // projection benefits section data
    const { projectionBenefitsId, impactAreaId, impactAreaName, impactAreaIndicator, impactAreaIndicatorName,
        notes, depthScaleId, depthScaleName, probabilityID, probabilityName, impact_area_active, active, dimensions } = req.body;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read Projection of benefits: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const projectionBenefits = await fullPposal.upsertProjectionBenefits(projectionBenefitsId, impactAreaId, impactAreaName, impactAreaIndicator, impactAreaIndicatorName,
            notes, depthScaleId, depthScaleName, probabilityID, probabilityName, impact_area_active, active, dimensions);

        res.json(new ResponseHandler('Full Proposal: Patch Projection of benefits.', { projectionBenefits }));

    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}

/**
 * GET PROJECTED ALL BENEFITS
 * @param req 
 * @param res { projectionBenefits }
 * @returns { projectionBenefits }
 */
export async function getProjectionBenefits(req: Request, res: Response) {

    const { initiativeId } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read Projection of benefits: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const projectionBenefits = await fullPposal.requestProjectionBenefits();

        res.json(new ResponseHandler('Full Proposal: Get Projection of benefits.', { projectionBenefits }));


    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}

/**
 * GET PROJECTED BENEFITS BY IMPACT STATEMENT
 * @param req 
 * @param res 
 * @returns projectionBenefitsByImpact
 */
export async function getProjectionBenefitsByImpact(req: Request, res: Response) {

    const { initiativeId, impactId } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read Projection of benefits: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const projectionBenefitsByImpact = await fullPposal.requestProjectionBenefitsByImpact(impactId);

        res.json(new ResponseHandler('Full Proposal: Get Projection of benefits by impact area.', { projectionBenefitsByImpact }));


    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}

/**
 * PATCH IMPACT STRATEGIES
 * @param req impact_strategies_id, active, challenge_priorization, research_questions, component_work_package, performance_results, human_capacity, partners
 * @param res { impactStrategies }
 * @returns { impactStrategies }
 */
export async function patchImpactStrategies(req: Request, res: Response) {

    const { initiativeId } = req.params;

    // impact strategies section data
    const { id, active, challenge_priorization, research_questions,
        component_work_package, performance_results, human_capacity, impact_area_id,
        impact_area_name, partners } = req.body;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Patch Patch Impact Strategies: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const impactStrategies = await fullPposal.upsertImpactStrategies(id, active, challenge_priorization, research_questions,
            component_work_package, performance_results, human_capacity, impact_area_id,
            impact_area_name, partners);

        res.json(new ResponseHandler('Full Proposal: Patch Impact Strategies.', { impactStrategies }));

    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}

/**
 * GET IMPACT STRATEGIES
 * @param req 
 * @param res { impactStrategies }
 * @returns { impactStrategies }
 */
export async function getImpactStrategies(req: Request, res: Response) {

    const { initiativeId, impactAreaId } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read Impact Stretegies: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const impactStrategies = await fullPposal.requestImpactStrategies(impactAreaId);

        res.json(new ResponseHandler('Full Proposal: Get Impact Stretegies.', { impactStrategies }));


    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}

/**
 * PATCH Melia and files
 * @param req { id, melia_plan, active, section, updateFiles, resultFramework, impactAreas }
 * @param res {melia}
 * @returns melia
 */
export async function patchMeliaAndFiles(req: Request, res: Response) {

    const { initiativeId, ubication } = req.params;

    //melia section data
    const { id, melia_plan, active, section, updateFiles } = JSON.parse(req.body.data);

    //melia section files
    const files = req['files'];

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Patch Patch melia: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const melia = await fullPposal.upsertMeliaAndFiles(initiativeId, ubication, stage, id, melia_plan, active, section, files, updateFiles);

        res.json(new ResponseHandler('Full Proposal: Patch melia.', { melia, files }));

    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}

/**
 * GET Melia and files data
 * @param req 
 * @param res {meliaData}
 * @returns meliaData
 */
export async function getMeliaAndFiles(req: Request, res: Response) {


    const { initiativeId, sectionName } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read melia and files: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const meliaData = await fullPposal.requestMeliaFiles(sectionName);

        res.json(new ResponseHandler('Full Proposal: melia and files.', { meliaData }));


    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }


}

/**
 * PATCH manage plan risk and files
 * @param req { id, management_plan, active, section, updateFiles }
 * @param res {managePlanRisk}
 * @returns managePlanRisk
 */
export async function patchManagePlanAndFiles(req: Request, res: Response) {

    const { initiativeId, ubication } = req.params;

    //melia section data
    const { id, management_plan, active, section, updateFiles, riskassessment } = JSON.parse(req.body.data);

    //melia section files
    const files = req['files'];

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Patch Patch management plan and risk: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const managePlanRisk = await fullPposal.upsertManagePlanAndFiles(initiativeId, ubication, stage, id, management_plan, active, section, files, updateFiles);
        const riskAssessment = await fullPposal.upsertRiskAssessment(managePlanRisk.upsertedManagePlan.id,riskassessment);

        res.json(new ResponseHandler('Full Proposal: Patch management plan and risk.', { managePlanRisk,riskAssessment, files }));

    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}

/**
 * GET manage plan risk and files data
 * @param req 
 * @param res {managePlanData}
 * @returns managePlanData
 */
export async function getManagePlanAndFiles(req: Request, res: Response) {

    const { initiativeId, sectionName } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read manage plan risk and files: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const managePlanData = await fullPposal.requestManagePlanFiles(sectionName);

        res.json(new ResponseHandler('Full Proposal: manage plan risk  and files.', { managePlanData }));


    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }


}


/**
 * PATCH Human Resources and Files
 * @param req 
 * @param res {humanResources}
 * @returns humanResources
 */
export async function patchHumanResourcesAndFiles(req: Request, res: Response) {

    const { initiativeId, ubication } = req.params;

    //melia section data
    const { id, gender_diversity_inclusion, capacity_development, active, section, updateFiles } = JSON.parse(req.body.data);

    //melia section files
    const files = req['files'];

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Patch Patch human resources: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const humanResources = await fullPposal.upsertHumanResourcesAndFiles(initiativeId, ubication, stage, id, gender_diversity_inclusion, capacity_development,
            active, section, files, updateFiles);

        res.json(new ResponseHandler('Full Proposal: Patch human resources.', { humanResources, files }));

    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}

/**
 * GET Human Resources Data
 * @param req 
 * @param res {humanResourcesData}
 * @returns humanResourcesData
 */
export async function getHumanResources(req: Request, res: Response) {

    const { initiativeId, sectionName } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read human resources and files: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const humanResourcesData = await fullPposal.requestHumanResourcesFiles(sectionName);

        res.json(new ResponseHandler('Full Proposal:human resources and files.', { humanResourcesData }));


    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }


}

/**
 * PATCH Financial Resources and Files
 * @param req 
 * @param res {financialResources}
 * @returns financialResources
 */
export async function patchFinancialResourcesAndFiles(req: Request, res: Response) {

    const { initiativeId, ubication } = req.params;

    //financial resources section data
    const { id, detailed_budget, active, section, updateFiles } = JSON.parse(req.body.data);

    //financial resources  section files
    const files = req['files'];

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Patch financial resources: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const financialResources = await fullPposal.upsertFinancialResourcesAndFiles(initiativeId, ubication, stage, id, detailed_budget,
            active, section, files, updateFiles);

        res.json(new ResponseHandler('Full Proposal: Patch financial resources.', { financialResources, files }));

    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}

/**
 * GET Financial Resources
 * @param req 
 * @param res {financialResourcesData}
 * @returns financialResourcesData
 */
export async function getFinancialResources(req: Request, res: Response) {

    const { initiativeId, sectionName } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read financial resources and files: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const financialResourcesData = await fullPposal.requestFinancialResourcesFiles(sectionName);

        res.json(new ResponseHandler('Full Proposal:financial resources and files.', { financialResourcesData }));


    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }


}


/**
 * PATCH Policy compliance Oversight
 * @param req { id, research_governance_policy, open_fair_data_policy, open_fair_data_details, active }
 * @param res { policyComplianceOversight }
 * @returns 
 */
export async function patchPolicyComplianceOversight(req: Request, res: Response) {

    const { initiativeId } = req.params;

    //Policy compliance Oversight section data
    const { id, research_governance_policy, open_fair_data_policy, open_fair_data_details, active } = req.body;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Patch policy compliance oversight: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const policyComplianceOversight = await fullPposal.upsertPolicyComplianceOversight(id, research_governance_policy,
            open_fair_data_policy, open_fair_data_details, active);

        res.json(new ResponseHandler('Full Proposal: Patch policy compliance oversight.', { policyComplianceOversight }));

    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}

/**
 * GET Policy compliance Oversight
 * @param req 
 * @param res { policyComplianceData }
 * @returns 
 */
export async function getPolicyComplianceOversight(req: Request, res: Response) {

    const { initiativeId } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read policy compliance oversight: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const policyComplianceData = await fullPposal.requestPolicyComplianceOversight();

        res.json(new ResponseHandler('Full Proposal:policy compliance oversight', { policyComplianceData }));


    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }


}

/**
 * PATCH INNOVATION PACKAGES
 * @param req { id, key_principles, active }
 * @param res { innovationPackages }
 * @returns 
 */
export async function patchInnovationPackages(req: Request, res: Response) {

    const { initiativeId } = req.params;

    //Policy compliance Oversight section data
    const { id, key_principles, active } = req.body;

    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Patch policy compliance oversight: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const innovationPackages = await fullPposal.upsertInnovationPackages(id, key_principles, active);

        res.json(new ResponseHandler('Full Proposal: Innovation Packages.', { innovationPackages }));

    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }

}

/**
 * GET INNOVATION PACKAGES
 * @param req 
 * @param res { innovationPackagesData }
 * @returns 
 */
export async function getInnovationPackages(req: Request, res: Response) {

    const { initiativeId } = req.params;
    const initvStgRepo = getRepository(InitiativesByStages);
    const stageRepo = getRepository(Stages);

    try {

        // get stage
        const stage = await stageRepo.findOne({ where: { description: 'Full Proposal' } });
        // get intiative by stage : proposal
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });

        // if not intitiative by stage, throw error
        if (initvStg == null) {
            throw new BaseError('Read policy compliance oversight: Error', 400, `Initiative not found in stage: ${stage.description}`, false);
        }
        // create new full proposal object
        const fullPposal = new ProposalHandler(initvStg.id.toString());

        const innovationPackagesData = await fullPposal.requestInnovationPackages();

        res.json(new ResponseHandler('Full Proposal:Innovation Packages', { innovationPackagesData }));


    } catch (error) {
        console.log(error)
        return res.status(error.httpCode).json(error);
    }


}



