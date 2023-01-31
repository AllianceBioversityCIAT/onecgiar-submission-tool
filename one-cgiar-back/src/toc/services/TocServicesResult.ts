import {getConnection, getRepository, getCustomRepository} from 'typeorm';
import {ValidatorTypes} from '../validators/validatorType'
import {ErrorValidators} from '../validators/errorsValidators'
import {CreateSdgResultsDto} from '../dto/tocSdgResults'
import {TocSdgResultsSdgTargetsDto} from '../dto/tocSdgResultsSdgTargets'
import {TocSdgResultsSdgIndicatorsDto} from '../dto/tocSdgResultsSdgIndicators'
import { TocImpactAreaResultsDto } from '../dto/tocImpactAreaResults';
import { TocImpactAreaResultsGlobalTargetsDto } from '../dto/tocImpactAreaResultsGlobalTargets';
import { TocImpactAreaResultsImpactAreaIndicatorsDto } from '../dto/tocImpactAreaResultsImpactAreaIndicators';
import { TocImpactAreaResultsSdgResultsDto } from '../dto/tocImpactAreaResultsSdgResults';
import { TocActionAreaResultsDto } from '../dto/tocActionAreaResults';
import{ TocSdgResultsRepository} from '../repositories/tocSdgResultsRepository'
import { TocActionAreaResultsOutcomesIndicatorsDto } from '../dto/tocActionAreaResultsOutcomesIndicators';
import { TocActionAreaResultsImpactAreaResultsDto } from '../dto/tocActionAreaResultsImpactAreaResults';


export class TocServicesResults{

    public queryRunner = getConnection().createQueryRunner().connection;
    public validatorType = new ValidatorTypes()
    public errorMessage = new ErrorValidators();
    

    async splitInformation(tocResultDashboard:any){
        if(this.validatorType.validatorIsObject(tocResultDashboard) &&  this.validatorType.validatorIsArray(tocResultDashboard) == false){
            if(this.validatorType.existPropertyInObject(tocResultDashboard, 'sdg_results')){
                if(this.validatorType.validatorIsArray(tocResultDashboard.sdg_results)){
                   const aux = await this.saveSdgResults(tocResultDashboard.sdg_results)
                   if(aux.status == 200){
                    if(this.validatorType.existPropertyInObject(tocResultDashboard, 'impact_area_results')){
                        if(this.validatorType.validatorIsArray(tocResultDashboard.impact_area_results)){
                            const impactArea = await this.saveImpactAreaResults(tocResultDashboard.impact_area_results);
                            if(this.validatorType.existPropertyInObject(tocResultDashboard, 'action_area_results')){
                                if(this.validatorType.validatorIsArray(tocResultDashboard.action_area_results)){
                                    return await this.saveActionAreasResults(tocResultDashboard.action_area_results)
                                }
                            }
                        }
                    }else{
                        return this.errorMessage.errorGeneral('Property called impact_area_results was expected on this object', 400)
                    }
                   }
                }else{
                    return this.errorMessage.errorGeneral('An Array was expected and received an '+ typeof(tocResultDashboard.sdg_results), 400)
                }
                
            }else{
                
                
                return this.errorMessage.errorGeneral('Property called sdg_result was expected on this object', 400)
            }
        }else{
            return this.errorMessage.errorGeneral('An object was expected and received an Array', 400)
        }
    }


    //Save Sdg results and your relation.
    async saveSdgResults(sdg_results:any){
        let listElementNotValid = [] 
        let listElementValid = []
        
        await sdg_results.forEach(async element => {
            
            if(this.validatorType.existPropertyInObject(element, 'toc_result_id') &&
                this.validatorType.existPropertyInObject(element, 'sdg_id') &&
                this.validatorType.existPropertyInObject(element, 'sdg_contribution')&&
                this.validatorType.existPropertyInObject(element, 'sdg_targets')&&
                this.validatorType.existPropertyInObject(element,'sdg_indicators')){
                    const dtoSdgResults = new CreateSdgResultsDto;
                    dtoSdgResults.toc_result_id = element.toc_result_id;
                    dtoSdgResults.sdg_id = element.sdg_id;
                    dtoSdgResults.sdg_contribution = element.sdg_contribution;
                    dtoSdgResults.is_active = true;
                    let relacionSdgResults = await this.saveIntermedialRelacionSdg(element.toc_result_id, element)
                    listElementValid.push({dtoSdgResults, relacionSdgResults});
                    
                }
            else{
                listElementNotValid.push(element);
            }
            
        });
        
        
        
        return this.errorMessage.createSdgResultMenssage(listElementValid, listElementNotValid, 200);
    }

    async saveTocSdgResultsSdgTarget(toc_sdg_result_id:string, objectSdgResultsSdgTarget:any, objectSdgResultsSdgIndicators:any){
        let listElementNotValid = [] 
        let listElementValid = []
        let listElementNotValidIndicator = [] 
        let listElementValidIndicator = []
        if(toc_sdg_result_id != null){
            if(this.validatorType.validatorIsArray(objectSdgResultsSdgTarget)){
                objectSdgResultsSdgTarget.forEach(element => {
                    if(this.validatorType.existPropertyInObject(element, 'sdg_target_id')&&
                    this.validatorType.existPropertyInObject(element, 'active')){
                        const sdgResultSdgTarget: TocSdgResultsSdgTargetsDto = new TocSdgResultsSdgTargetsDto;
                        sdgResultSdgTarget.sdg_toc_result_id = toc_sdg_result_id;
                        sdgResultSdgTarget.sdg_target_id = element.sdg_target_id;
                        sdgResultSdgTarget.is_active = element.active;
                        listElementValid.push(sdgResultSdgTarget);
                    }else{
                        listElementNotValid.push(element)
                    }
                
                });
            }else{
                return this.errorMessage.errorGeneral('Was exoected a Array ', 400)
            }
            
            if(this.validatorType.validatorIsArray(objectSdgResultsSdgIndicators)){
                if(objectSdgResultsSdgIndicators.length >0){
                    objectSdgResultsSdgIndicators.forEach(element => {
                        if(this.validatorType.existPropertyInObject(element, 'sdg_indicator_id')){
                            const sdgResultSdgIndicator: TocSdgResultsSdgIndicatorsDto = new TocSdgResultsSdgIndicatorsDto;
                            sdgResultSdgIndicator.sdg_toc_result_id = toc_sdg_result_id;
                            sdgResultSdgIndicator.sdg_indicator_id = element.sdg_indicator_id;
                            listElementValidIndicator.push(sdgResultSdgIndicator);
                        }else{
                            listElementNotValidIndicator.push(element)
                        }
                    
                    });
                }else{
                    listElementValidIndicator.push();
                }
            }else{
                return this.errorMessage.errorGeneral('Was exoected a Array ', 400)
            }
        }else{
            return this.errorMessage.errorGeneral('In this case is necessary toc_result_id', 400)
        }
        
        return {sdg_target: listElementValid, sdg_indicator:listElementValidIndicator}
    }

    async saveIntermedialRelacionSdg(toc_sdg_result_id:string, objectSdgResults:any){
        if(toc_sdg_result_id != null){
            if(this.validatorType.existPropertyInObject(objectSdgResults,'sdg_targets') &&
            this.validatorType.existPropertyInObject(objectSdgResults,'sdg_indicators')){
                let sdgResultSdgTarget = await this.saveTocSdgResultsSdgTarget(toc_sdg_result_id, objectSdgResults.sdg_targets, objectSdgResults.sdg_indicators);
                
                return sdgResultSdgTarget
            }
        }
    }

    //save all impact area results and your relations.
    async saveImpactAreaResults(impactAreaResults:any){
        let listElementNotValid = [] 
        let listElementValid = []
        await impactAreaResults.forEach(async element => {
            if(this.validatorType.existPropertyInObject(element, 'toc_result_id')&&
            this.validatorType.existPropertyInObject(element,'impact_area_id') &&
            this.validatorType.existPropertyInObject(element, 'outcome_statement')){
                const dtoImpactAreaResults = new TocImpactAreaResultsDto;
                dtoImpactAreaResults.toc_result_id = element.toc_result_id;
                dtoImpactAreaResults.impact_area_id = element.impact_area_id;
                dtoImpactAreaResults.outcome_statement = element.outcome_statement;
                let infoRelaction = await this.saveRelationImpactAreaResults(element, element.toc_result_id)
                listElementValid.push({impactArea: dtoImpactAreaResults, infoRelaction});
            }
            else{
                listElementNotValid.push(element)
            }
        });
        return listElementValid;
    }
    
    async saveRelationImpactAreaResults(impactAreaResults:any, toc_result_id:string){
        let listGlobalTraget=[];
        let listImpactIndicator = [];
        let listImpactSdg = []
        if(toc_result_id != null){
            if(this.validatorType.existPropertyInObject(impactAreaResults, 'global_targets')){
                if(this.validatorType.validatorIsArray(impactAreaResults.global_targets)){
                    impactAreaResults.global_targets.forEach(element => {
                        const impactAreaResultGlobalTargets = new TocImpactAreaResultsGlobalTargetsDto;
                        impactAreaResultGlobalTargets.impact_area_toc_results_id = toc_result_id;
                        impactAreaResultGlobalTargets.global_traget = element.global_target_id;
                        impactAreaResultGlobalTargets.is_active = element.active;
                        listGlobalTraget.push(impactAreaResultGlobalTargets);
                    });
                }
            }else{
                return this.errorMessage.errorGeneral('Not Exists global_tagert', 400);
            }
            if(this.validatorType.existPropertyInObject(impactAreaResults, 'impact_indicators')){
                impactAreaResults.impact_indicators.forEach(element => {
                    const impactAreaResultImpactIndicators = new TocImpactAreaResultsImpactAreaIndicatorsDto;
                    impactAreaResultImpactIndicators.impact_area_toc_result_id = toc_result_id;
                    impactAreaResultImpactIndicators.impact_areas_indicators_id = element.impact_indicator_id;
                    impactAreaResultImpactIndicators.is_active = element.active;
                    listImpactIndicator.push(impactAreaResultImpactIndicators);
                });
            }else{
                return this.errorMessage.errorGeneral('Not Exists impact_indicators', 400);
            }
            if(this.validatorType.existPropertyInObject(impactAreaResults, 'sdgs')){
                await impactAreaResults.sdgs.forEach(elements => {
                    const impactAreaResultSdg = new TocImpactAreaResultsSdgResultsDto;
                    impactAreaResultSdg.impact_area_toc_result_id = toc_result_id;
                    impactAreaResultSdg.sdg_toc_results_id = elements[0].toc_result_id;
                    impactAreaResultSdg.is_active = elements[0].active;
                    listImpactSdg.push(impactAreaResultSdg);
                    
                    
                });
            }else{
                return this.errorMessage.errorGeneral('Not Exists sdgs', 400);
            }
        }

        return {indicator:listImpactIndicator,  global:listGlobalTraget, sdg: listImpactSdg }
    }


    //save all action areas results and your relations.

    async saveActionAreasResults(actionsAreaResults:any){
        let listElementNotValid = [] 
        let listElementValid = []

        await actionsAreaResults.forEach(async element => {
            if(this.validatorType.existPropertyInObject(element,'toc_result_id')&&
            this.validatorType.existPropertyInObject(element,'action_area_id')&&
            this.validatorType.existPropertyInObject(element,'outcome_id')&&
            this.validatorType.existPropertyInObject(element,'statement')){
                const actionAreasResultsdt = new TocActionAreaResultsDto;
                actionAreasResultsdt.toc_result_id = element.toc_result_id;
                actionAreasResultsdt.outcome_id = element.outcome_id;
                actionAreasResultsdt.statement = element.statement;
                actionAreasResultsdt.action_areas_id = element.action_area_id;
                const relationActionArea = await this.saveRelationActionAreasResults(element.toc_result_id, element)
                listElementValid.push({actionArea: actionAreasResultsdt, relationActionArea})
            }else{
                listElementNotValid.push(element)
            }
        });
        return listElementValid;
    }

    async saveRelationActionAreasResults(toc_result_id:string, actionAreaResults:any){
        let listOutComeIndicator = []
        let listImpactAreaIndicator = []
        if(toc_result_id!= null){
            if(this.validatorType.validatorIsArray(actionAreaResults.outcome_indicators)){
                actionAreaResults.outcome_indicators.forEach(element => {
                    if(this.validatorType.existPropertyInObject(element,'outcome_indicator_id')&& 
                    this.validatorType.existPropertyInObject(element,'active')){
                        const actionAreaResultOutcomeIndicator = new TocActionAreaResultsOutcomesIndicatorsDto;
                        actionAreaResultOutcomeIndicator.action_area_toc_result_id = toc_result_id;
                        actionAreaResultOutcomeIndicator.action_area_outcome_indicator_id = element.outcome_indicator_id;
                        actionAreaResultOutcomeIndicator.is_active = element.active;
                        listOutComeIndicator.push(actionAreaResultOutcomeIndicator)
                    }
                });
            }
            if(this.validatorType.validatorIsArray(actionAreaResults.impact_areas)){
                actionAreaResults.impact_areas.forEach(element => {
                    if(this.validatorType.existPropertyInObject(element,'toc_result_id')&& 
                    this.validatorType.existPropertyInObject(element,'active')){
                        const actionAreaResultOutcomeIndicator = new TocActionAreaResultsImpactAreaResultsDto;
                        actionAreaResultOutcomeIndicator.action_area_toc_result_id = toc_result_id;
                        actionAreaResultOutcomeIndicator.impact_area_toc_result_is = element.toc_result_id;
                        actionAreaResultOutcomeIndicator.is_active = element.active;
                        listImpactAreaIndicator.push(actionAreaResultOutcomeIndicator)
                    }
                });
            }
        }
        return {impact_area:listImpactAreaIndicator ,  outcome:listOutComeIndicator }
    }
}