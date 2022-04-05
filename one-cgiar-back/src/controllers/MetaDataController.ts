import { Request, Response } from 'express';
import { MetaDataHandler } from '../handlers/MetaDataDomain';
import { ResponseHandler } from '../handlers/Response';
import { getRepository } from 'typeorm';
import { InitiativesByStages } from '../entity/InititativesByStages';
import { Stages } from '../entity/Stages';
import { BaseError } from '../handlers/BaseError';

/**
 * METADATA
 */

/**
 * GET MENU
 * @param req initiativeId
 * @param res { metadata }
 * @returns { metadata }
 */
export async function getMenu(req: Request, res: Response) {
  // get initiative by stage id from client
  const { initiativeId } = req.params;

  try {
    // create new Meta Data object
    const metaData = new MetaDataHandler();

    // Get metadata per sections
    let stages = await metaData.getStages(initiativeId);
    let sections = await metaData.getSections(initiativeId);
    let subsections = await metaData.getSubSectios(initiativeId);

    // Map metadata
    stages.map((stage) => {
      stage['sections'] = sections.filter((s) => {
        return s.stageId === stage.stageId;
      });

      sections.map((section) => {
        section['subsections'] = subsections.filter((sb) => {
          return sb.sectionId === section.sectionId;
        });
      });
    });

    res.json(new ResponseHandler('MetaData:Menu', { stages }));
  } catch (error) {
    return res.status(error.httpCode).json(error);
  }
}

/**
 * VALIDATIONS
 */

export async function getValidations(req: Request, res: Response) {
  // get initiative by stage id from client
  const { initiativeId, stageId } = req.params;

  const initvStgRepo = getRepository(InitiativesByStages);
  const stageRepo = getRepository(Stages);

  try {
    // get stage
    const stage = await stageRepo.findOne({ where: { id: stageId } });

    // get intiative by stage
    const initvStg: InitiativesByStages = await initvStgRepo.findOne({
      where: { initiative: initiativeId, stage }
    });
    // if not intitiative by stage, throw error
    if (initvStg == null || initvStg == undefined) {
      throw new BaseError(
        'Validations: Error',
        400,
        `Validations not found in stage:` + stageId,
        false
      );
    }

    // create new Meta Data object
    const metaData = new MetaDataHandler(initvStg.id.toString());
    let validatorsObject: {};

    // switch validators by stages
    switch (stage.description) {
      case 'Pre Concept':
        validatorsObject = {
          generalInformation: await metaData.pre_validationGI(),
          initialTheoryChange: await metaData.pre_validationInitialTOC(),
          initiativeStatements: await metaData.pre_validationInitiativeStatements(),
          workPackgesGeoScope: await metaData.pre_validationWorkPackagesGeoScope(),
          // results: null,
          // innovations: null,
          // keyPartners: null,
          // globalBudget: null
        }
        break;
      case 'Full Proposal':
        validatorsObject = {
          generalInformation: await metaData.validationGI(),
          innovationPackages: await metaData.validationInnovationPackages(),
          melia: await metaData.validationMelia(),
          managePlan: await metaData.validationManagementPlan(),
          humanResources: await metaData.validationHumanResources(),
          financialResources: await metaData.validationFinancialResources(),
          policyCompliance: await metaData.validationPolicyCompliance(),
          impactStrategies: await metaData.validationImpactStrategies(),
          workPackages: await metaData.validationWorkPackages(),
          context: await metaData.validationContext(),
        }
        break;

      default:
        break;
    }


    /*******************************************/
    res.json(
      new ResponseHandler('Green Checks:Menu', validatorsObject)
    );
  } catch (error) {
    return res.status(error.httpCode).json(error);
  }
}
