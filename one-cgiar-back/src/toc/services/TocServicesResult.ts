import {getConnection, getRepository} from 'typeorm';
import {ValidatorTypes} from '../validators/validatorType'
import {ErrorValidators} from '../validators/errorsValidators'
import {CreateSdgResultsDto} from '../dto/tocSdgResults'
import {TocSdgResultsSdgTargetsDto} from '../dto/tocSdgResultsSdgTargets'
import {TocSdgResultsSdgIndicatorsDto} from '../dto/tocSdgResultsSdgIndicators'
import { TocSdgResults } from '../entity/tocSdgResults';


export class TocServicesResults{
    public queryRunner = getConnection().createQueryRunner().connection;
    public validatorType = new ValidatorTypes()
    public errorMessage = new ErrorValidators();
    
    //public sdgResults = getRepository(TocSdgResults);
    async splitInformation(tocResultDashboard:any){
        if(this.validatorType.validatorIsObject(tocResultDashboard) &&  this.validatorType.validatorIsArray(tocResultDashboard) == false){
            if(this.validatorType.existPropertyInObject(tocResultDashboard, 'sdg_results')){
                if(this.validatorType.validatorIsArray(tocResultDashboard.sdg_results)){
                    return await this.saveSdgResults(tocResultDashboard.sdg_results)
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

    async saveSdgResults(sdg_results:any){
        let listElementNotValid = [] 
        let listElementValid = []
        let listSdgResults = [];
        
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
                    listElementValid.push({sdg_results:dtoSdgResults, relation:relacionSdgResults});
                    listSdgResults.push(dtoSdgResults);
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
        let listSdgResultsSdgTargets = [];
        let listSdgResultsSdgIndicators = [];
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
                    listElementValidIndicator.push({
                    "error": "Not exist relation in this case",
                    "status": 200});
                }
            }else{
                return this.errorMessage.errorGeneral('Was exoected a Array ', 400)
            }
        }else{
            return this.errorMessage.errorGeneral('In this case is necessary toc_result_id', 400)
        }
        let messageValid = {relation: {
            sdg_target:listElementValid,
            sdg_indicator: listElementValidIndicator
        }};
        listSdgResultsSdgTargets.push(listElementValid);
        listSdgResultsSdgIndicators.push(listElementNotValidIndicator);
        return this.errorMessage.createSdgResultMenssage(messageValid, {relation: {
            sdg_target:listElementNotValid,
            sdg_indicator: listElementNotValidIndicator
        }}, 200);
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

    


}