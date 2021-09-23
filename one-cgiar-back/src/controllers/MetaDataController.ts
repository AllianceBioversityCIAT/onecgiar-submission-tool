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

        // // Get validations for general information

        let innovationPackages = await metaData.validationInnovationPackages();

        // Get validations for MELIA

        let melia = await metaData.validationMelia();

        // Get validations for Manage Plan

        let managePlan = await metaData.validationManagementPlan();

        // Get validations human resources

        let humanResources = await metaData.validationHumanResources();

        // Get validations financial resources

        let financialResources = await metaData.validationFinancialResources();

        /*******************************************/

        // Convert boolean ('0' and '1' to number)
        generalInformation[0].ValidateGI = parseInt(generalInformation[0].ValidateGI);
        innovationPackages[0].ValidateInnovationPackages = parseInt(innovationPackages[0].ValidateInnovationPackages);
        melia[0].ValidateMelia = parseInt(melia[0].ValidateMelia);
        managePlan[0].ValidateManagePlan = parseInt(managePlan[0].ValidateManagePlan);
        humanResources[0].ValidateHumanResources = parseInt(humanResources[0].ValidateHumanResources);
        financialResources[0].ValidateFinancialResources = parseInt(financialResources[0].ValidateFinancialResources);

        res.json(new ResponseHandler('Green Checks:Menu', { generalInformation, innovationPackages, melia, managePlan, humanResources, financialResources }));

    } catch (error) {

        return res.status(error.httpCode).json(error);

    }

}