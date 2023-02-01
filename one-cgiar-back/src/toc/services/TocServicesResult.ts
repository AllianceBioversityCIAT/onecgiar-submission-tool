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
import { TocResponsesRepository } from '../../repositories/tocResponsesRepository';
import { SdgTarget } from '../entity/sdg_target';
import { TocResultsDto } from '../dto/tocResults';
import { TocResultsActionAreaResultsDto } from '../dto/tocResultsActionAreaResults';
import { TocResultsImpactAreaResultsDto } from '../dto/tocResultsImpactAreaResults';
import { TocResultsSdgResultsDto } from '../dto/tocResultsSdgResults';
import { TocSdgResultsSdgTargets } from '../entity/tocSdgResultsSdgTargets';



export class TocServicesResults {

    public queryRunner = getConnection().createQueryRunner().connection;
    public validatorType = new ValidatorTypes()
    public errorMessage = new ErrorValidators();
    
    async splitInformation(tocResultDashboard:any){
        if(this.validatorType.existPropertyInObjectMul(tocResultDashboard,['sdg_results',
        'impact_area_results','action_area_results','output_outcome_results'])){
                const sdg_results = await this.saveSdgResults(tocResultDashboard.sdg_results);
                if(sdg_results != null && this.validatorType.validatorIsArray(sdg_results)){
                    const impact_area_results= await this.saveImpactAreaResults(tocResultDashboard.impact_area_results, sdg_results)
                    if(impact_area_results!= null && this.validatorType.validatorIsArray(impact_area_results)){
                        const action_area = await this.saveActionAreaResult(tocResultDashboard.action_area_results,impact_area_results)
                        if(action_area!= null && this.validatorType.validatorIsArray(action_area)){
                            const tocResult= await this.saveOutputOutcomeResults(tocResultDashboard.output_outcome_results,sdg_results,impact_area_results,action_area)
                            return this.saveInDataBase(sdg_results);
                        }
                    }
                }
        }else{
            return this.errorMessage.errorGeneral('This json not complete or new names titles', 400)
        }
    }


    //mapping sdgResults.
    async saveSdgResults(sdgResults:any){
        let listValidSdgResults = []
        let listNotValidSdgResults = []
        if(this.validatorType.validatorIsArray(sdgResults)){
            sdgResults.forEach(async element => {
                if(this.validatorType.existPropertyInObjectMul(sdgResults,['sdg_id', 
                'toc_result_id','sdg_contribution','sdg_targets','sdg_indicators'])){
                    const sdgResultsDto = new CreateSdgResultsDto;          
                    sdgResultsDto.sdg_id = typeof element.sdg_id == 'number'? element.sdg_id: null;
                    sdgResultsDto.toc_result_id = typeof element.toc_result_id == 'string'? element.toc_result_id: null;
                    sdgResultsDto.sdg_contribution = typeof element.sdg_contribution == 'string'? element.sdg_contribution: null;
                    sdgResultsDto.is_active = true;
                    if(this.validatorType.validExistNull(sdgResultsDto)){
                        const relationSdg = await this.saveRelationSdgResults(element, element.toc_result_id);
                        if(typeof relationSdg == 'object'){
                            listValidSdgResults.push({sdg_results: sdgResultsDto, relation: relationSdg});
                        }else{
                            return this.errorMessage.errorGeneral('Exist type incorrect', 400)
                        }
                    }else{
                        listNotValidSdgResults.push(element);
                    }
                }
            });
        }else{
            return this.errorMessage.errorGeneral('Expected Array ', 400)
        }
        return listValidSdgResults;
    }

    async saveRelationSdgResults(objectRelacion:any, toc_results_id:string){
        let listValidSdgTarget = [];
        let listValidSdgIndicator = [];
        if(this.validatorType.validatorIsArray(objectRelacion.sdg_targets)){
            objectRelacion.sdg_targets.forEach(element => {
                if(this.validatorType.existPropertyInObjectMul(element, ['sdg_target_id','active'])){
                    const relacionSdgTarget = new TocSdgResultsSdgTargetsDto;
                    relacionSdgTarget.sdg_target_id = typeof element.sdg_target_id == 'number'?element.sdg_target_id:null;
                    relacionSdgTarget.is_active = typeof element.active == 'boolean'?element.active:null;
                    relacionSdgTarget.sdg_toc_result_id = toc_results_id;
                    if(this.validatorType.validExistNull(relacionSdgTarget)){
                        listValidSdgTarget.push(relacionSdgTarget);
                    }else{
                        return false;
                    }
                }
            });
        }
        if(this.validatorType.validatorIsArray(objectRelacion.sdg_indicators)){
            objectRelacion.sdg_indicators.forEach(element => {
                if(this.validatorType.existPropertyInObjectMul(element, ['sdg_indicator_id'])){
                    const relacionSdgIndicator = new TocSdgResultsSdgIndicatorsDto;
                    relacionSdgIndicator.sdg_indicator_id = typeof element.sdg_indicator_id == 'number'?element.sdg_target_id:null;
                    relacionSdgIndicator.sdg_toc_result_id = toc_results_id;
                    if(this.validatorType.validExistNull(relacionSdgIndicator)){
                        listValidSdgIndicator.push(relacionSdgIndicator);
                    }else{
                        return false;
                    }
                }
            });
        }
        return {sdg_target:listValidSdgTarget, sdg_indicator:listValidSdgIndicator };
        
    }

    //mapping impact areas results

    async saveImpactAreaResults(impactAreaResults:any, sdgResults:any){
        let listValidImpactArea = []
        if(this.validatorType.validatorIsArray(impactAreaResults)){
            impactAreaResults.forEach(async element => {
                if(this.validatorType.existPropertyInObjectMul(element, ['toc_result_id',
            'impact_area_id','outcome_statement','global_targets', 'impact_indicators',
            'sdgs'])){
                const impactAreadto = new TocImpactAreaResultsDto;
                impactAreadto.impact_area_id = typeof element.impact_area_id == 'number'? element.impact_area_id : null;
                impactAreadto.toc_result_id = typeof element.toc_result_id == 'string'? element.toc_result_id : null;
                impactAreadto.outcome_statement = typeof element.outcome_statement == 'string'? element.outcome_statement : null;
                if(this.validatorType.validExistNull(impactAreadto)){
                    const relation = await this.saveRelationImpactArea(element,element.toc_result_id,sdgResults)
                    listValidImpactArea.push({impact_area: impactAreadto, relation: relation});
                }
            }
            });
        }
        return listValidImpactArea;
    }

    async saveRelationImpactArea(objectImpactArea:any, toc_result_id:string, sdgResults:any){
        let listValidGlobalTarget = []
        let listValidImpactIndicator = []
        let listValidSdg = []
        if(this.validatorType.validatorIsArray(objectImpactArea.global_targets)){
            objectImpactArea.global_targets.forEach(element => {
                if(this.validatorType.existPropertyInObjectMul(element, ['global_target_id','active'])){
                    const relationGlobalTarget = new TocImpactAreaResultsGlobalTargetsDto;
                    relationGlobalTarget.impact_area_toc_results_id = toc_result_id;
                    relationGlobalTarget.global_traget = typeof element.global_target_id == 'number'? element.global_target_id : null;
                    relationGlobalTarget.is_active = typeof element.active == 'boolean'? element.active : null;
                    if(this.validatorType.validExistNull(relationGlobalTarget)){
                        listValidGlobalTarget.push(relationGlobalTarget);
                    }
                }
            });
        }
        if(this.validatorType.validatorIsArray(objectImpactArea.sdgs)){
            objectImpactArea.sdgs[0].forEach(element => {
                if(this.validatorType.existPropertyInObjectMul(element, ['toc_result_id','active'])){
                    const relationSdg = new TocImpactAreaResultsSdgResultsDto;
                    relationSdg.impact_area_toc_result_id = toc_result_id;
                    relationSdg.sdg_toc_results_id = typeof element.toc_result_id == 'string'&& this.validatorType.validExistId(sdgResults,element.toc_result_id) ? element.toc_result_id : null;
                    relationSdg.is_active = typeof element.active == 'boolean'? element.active : null;
                    if(this.validatorType.validExistNull(relationSdg)){
                        listValidSdg.push(relationSdg);
                    }
                }
            });
        }
        if(this.validatorType.validatorIsArray(objectImpactArea.impact_indicators)){
            objectImpactArea.impact_indicators.forEach(element => {
                if(this.validatorType.existPropertyInObjectMul(element, ['impact_indicator_id','active'])){
                    const relationImpactIndicator = new TocImpactAreaResultsImpactAreaIndicatorsDto;
                    relationImpactIndicator.impact_area_toc_result_id = toc_result_id;
                    relationImpactIndicator.impact_areas_indicators_id = typeof element.impact_indicator_id == 'number'? element.impact_indicator_id : null;
                    relationImpactIndicator.is_active = typeof element.active == 'boolean'? element.active : null;
                    if(this.validatorType.validExistNull(relationImpactIndicator)){
                        listValidImpactIndicator.push(relationImpactIndicator);
                    }
                }
            });
        }

        return {
            global_target: listValidGlobalTarget,
            impact_indicator:listValidImpactIndicator,
            sdg:listValidSdg
        }
    }

    //mapping action areas results

    async saveActionAreaResult(actionAreaResults:any, impactAreaResulst:any){
        let listValidActionArea=[]
        if(this.validatorType.validatorIsArray(actionAreaResults)){
            actionAreaResults.forEach(async element => {
                if(this.validatorType.existPropertyInObjectMul(element,['toc_result_id','action_area_id',
                'outcome_id','statement','outcome_indicators','impact_areas'])){
                    const actionAreaDto = new TocActionAreaResultsDto;
                    actionAreaDto.toc_result_id = typeof element.toc_result_id == 'string'? element.toc_result_id : null;
                    actionAreaDto.action_areas_id = typeof element.action_area_id == 'number'? element.action_area_id : null;
                    actionAreaDto.outcome_id = typeof element.outcome_id == 'number'? element.outcome_id : null;
                    actionAreaDto.statement = typeof element.statement == 'string'? element.statement : null;
                    actionAreaDto.is_active = true;
                    if(this.validatorType.validExistNull(actionAreaDto)){
                        const relation = await this.relationActionAreaResults(element,impactAreaResulst,element.toc_result_id)
                        listValidActionArea.push({action_area:actionAreaDto, relation:relation});
                    }
                }
            });
        }
        return listValidActionArea;
    }


    async relationActionAreaResults(objectActionArea:any, impactAreaResults:any, toc_result_id){
        let listValidOutCome = []
        let listValidImpactArea = []
        if(this.validatorType.validatorIsArray(objectActionArea.outcome_indicators)){
            objectActionArea.outcome_indicators.forEach(element => {
                if(this.validatorType.existPropertyInObjectMul(element,['outcome_indicator_id','active'])){
                    const relationOutCome = new TocActionAreaResultsOutcomesIndicatorsDto;
                    relationOutCome.action_area_toc_result_id = toc_result_id;
                    relationOutCome.action_area_outcome_indicator_id = typeof element.outcome_indicator_id == 'number'? element.outcome_indicator_id : null;
                    relationOutCome.is_active = typeof element.active == 'boolean'? element.active : null;
                    if(this.validatorType.validExistNull(relationOutCome)){
                        listValidOutCome.push(relationOutCome);
                    }
                }
            });
        }
        if(this.validatorType.validatorIsArray(objectActionArea.impact_areas)){
            objectActionArea.impact_areas.forEach(element => {
                if(this.validatorType.existPropertyInObjectMul(element,['toc_result_id','active'])){
                    const relationImpactArea= new TocActionAreaResultsImpactAreaResultsDto;
                    relationImpactArea.action_area_toc_result_id = toc_result_id;
                    relationImpactArea.impact_area_toc_result_is = typeof element.toc_result_id == 'string'&& this.validatorType.validExistIdImpact(impactAreaResults,element.toc_result_id) ? element.toc_result_id : null;
                    relationImpactArea.is_active = typeof element.active == 'boolean'? element.active : null;
                    if(this.validatorType.validExistNull(relationImpactArea)){
                        listValidImpactArea.push(relationImpactArea);
                    }
                }
            });
        }

        return {outcome:listValidOutCome, impact_area:listValidImpactArea}
    }


    //mapping output_outcome_results

    async saveOutputOutcomeResults(outputOutcomeResults:any, sdgResults:any, impactAreaResults:any, actionAreaResult:any){
        let listValidTocResult=[]
        if(this.validatorType.validatorIsArray(outputOutcomeResults)){
            outputOutcomeResults.forEach(async element => {
                if(this.validatorType.existPropertyInObjectMul(element,['toc_result_id',
                'result_type','wp_id','result_title','result_description','outcome_type',
                'indicators','action_areas','impact_areas','sdgs','geo_scope'])){
                    const outPutComeDto = new TocResultsDto;
                    outPutComeDto.toc_result_id = typeof element.toc_result_id == 'string'? element.toc_result_id : null;
                    outPutComeDto.result_type = typeof element.result_type == 'number'? element.result_type : null;
                    outPutComeDto.work_packages_id = typeof element.wp_id == 'number'? element.wp_id : null;
                    outPutComeDto.result_title = typeof element.result_title == 'string'? element.result_title : null;
                    outPutComeDto.result_description = typeof element.result_description == 'string'? element.result_description : null;
                    outPutComeDto.outcome_type = typeof element.outcome_type == 'string'? element.outcome_type : null;
                    outPutComeDto.is_active = true;
                    outPutComeDto.is_global = true;
                    if(this.validatorType.validExistNull(outPutComeDto)){
                        const relation = await this.relationTocResults(element,element.toc_result_id,sdgResults,impactAreaResults,actionAreaResult)
                        listValidTocResult.push({outcome:outPutComeDto,relation:relation});
                    }
                }
            });

        }
        return listValidTocResult;
    }

    async relationTocResults(outputOutcomeResults:any, toc_results_id:string, sdgResults:any, impactAreaResults:any, actionAreaResult:any){
        let listValidActionArea = []
        let listValidSdg = []
        let listValidImpact = []
        if(this.validatorType.validatorIsArray(outputOutcomeResults.action_areas)){
            outputOutcomeResults.action_areas.forEach(element => {
                if(this.validatorType.existPropertyInObjectMul(element,['toc_result_id','active'])){
                    const tocResultAction = new TocResultsActionAreaResultsDto;
                    tocResultAction.toc_result_id = toc_results_id;
                    tocResultAction.action_area_toc_result_id = typeof element.toc_result_id == 'string' && this.validatorType.validExistIdAction(actionAreaResult,element.toc_result_id)? element.toc_result_id : null;
                    tocResultAction.is_active = typeof element.active == 'boolean'? element.active : null;
                    if(this.validatorType.validExistNull(tocResultAction)){
                        listValidActionArea.push(tocResultAction);
                    }
                }   
            });
        }
        if(this.validatorType.validatorIsArray(outputOutcomeResults.impact_areas)){
            outputOutcomeResults.impact_areas.forEach(element => {
                if(this.validatorType.existPropertyInObjectMul(element,['toc_result_id','active'])){
                    const tocResultImpact = new TocResultsImpactAreaResultsDto;
                    tocResultImpact.toc_result_id = toc_results_id;
                    tocResultImpact.impact_area_toc_result_id = typeof element.toc_result_id == 'string' && this.validatorType.validExistIdImpact(impactAreaResults,element.toc_result_id)? element.toc_result_id : null;
                    tocResultImpact.is_active = typeof element.active == 'boolean'? element.active : null;
                    if(this.validatorType.validExistNull(tocResultImpact)){
                        listValidImpact.push(tocResultImpact);
                    }
                }   
            });
        }
        if(this.validatorType.validatorIsArray(outputOutcomeResults.sdgs)){
            outputOutcomeResults.sdgs.forEach(element => {
                if(this.validatorType.existPropertyInObjectMul(element,['toc_result_id','active'])){
                    const tocResultSdg = new TocResultsSdgResultsDto;
                    tocResultSdg.toc_result_id = toc_results_id;
                    tocResultSdg.sdg_toc_result_id = typeof element.toc_result_id == 'string' && this.validatorType.validExistId(sdgResults,element.toc_result_id)? element.toc_result_id : null;
                    tocResultSdg.is_active = typeof element.active == 'boolean'? element.active : null;
                    if(this.validatorType.validExistNull(tocResultSdg)){
                        listValidSdg.push(tocResultSdg);
                    }
                }   
            });
        }
        return {action_area: listValidActionArea, impact_area:listValidImpact, sdg:listValidSdg}
    }

    async saveInDataBase(sdgResults:any){
        const repoCusto = await getRepository(TocSdgResultsSdgTargets);
        let listAux=[]
        await sdgResults.forEach(element => {
            element.relation.sdg_target.forEach(elements => {
                listAux.push(elements)
            });
        });

        return await repoCusto.save(listAux)
    }
}