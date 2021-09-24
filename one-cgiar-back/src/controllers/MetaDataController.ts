import { Request, Response } from 'express';
import { MetaDataHandler } from '../handlers/MetaDataHandler';
import { ResponseHandler } from '../handlers/Response';
import { getRepository } from 'typeorm';
import { InitiativesByStages } from '../entity/InititativesByStages';
import { Stages } from '../entity/Stages';
import { BaseError } from '../handlers/BaseError';

/**
 * METADATA
 */


/**
 * 
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
        stages.map(stage => {
            stage['sections'] = sections.filter(s => {
                return (s.stageId === stage.stageId)
            })

            sections.map(section => {
                section['subsections'] = subsections.filter(sb => {
                    return (sb.sectionId === section.sectionId)
                })
            })
        })

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
        const initvStg: InitiativesByStages = await initvStgRepo.findOne({ where: { initiative: initiativeId, stage } });
        // if not intitiative by stage, throw error
        if (initvStg == null || initvStg == undefined) {
            throw new BaseError('Validations: Error', 400, `Validations not found in stage: ${stage.description}`, false);
        }


        // create new Meta Data object
        const metaData = new MetaDataHandler(initvStg.id.toString());

        // Get validations for general information
        let generalInformation = await metaData.validationGI();

        // Get validations for general information

        let innovationPackages = await metaData.validationInnovationPackages();

        // Get validations for MELIA

        let melia = await metaData.validationMelia();

        // Get validations for Manage Plan

        let managePlan = await metaData.validationManagementPlan();

        // Get validations human resources

        let humanResources = await metaData.validationHumanResources();

        // Get validations financial resources

        let financialResources = await metaData.validationFinancialResources();

        // Get validations financial resources

        let policyCompliance = await metaData.validationPolicyCompliance();

        // Get impact strategies

        let impactStrategies = await metaData.validationImpactStrategies();

        /*******************************************/

        res.json(new ResponseHandler('Green Checks:Menu', { generalInformation, innovationPackages, melia, managePlan, humanResources, financialResources, policyCompliance, impactStrategies }));

    } catch (error) {

        return res.status(error.httpCode).json(error);

    }

}