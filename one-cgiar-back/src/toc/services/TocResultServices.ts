import {getConnection, getRepository, getCustomRepository} from 'typeorm';
import {ValidatorTypes} from '../validators/validatorType'
import { CreateSdgResultsDto } from '../dto/tocSdgResults';
import { SdgTarget } from '../entity/sdg_target';
import { TocSdgResultsSdgTargetsDto } from '../dto/tocSdgResultsSdgTargets';
import { TocSdgResults } from '../entity/tocSdgResults';
import { TocSdgResultsSdgTargets } from '../entity/tocSdgResultsSdgTargets';
import { TocSdgResultsSdgIndicatorsDto } from '../dto/tocSdgResultsSdgIndicators';
import { TocSdgResultsSdgIndicators } from '../entity/tocSdgResultsSdgIndicators';

export class TocResultServices{

    public sdgTarget =  getRepository(TocSdgResultsSdgTargets);
    public sdgIndicator =  getRepository(TocSdgResultsSdgIndicators);
    public validatorType = new ValidatorTypes();
    async splitInformation(tocIniciative:any){
        if(this.validatorType.validatorIsObject(tocIniciative) &&
        this.validatorType.validatorIsArray(tocIniciative) == false &&
        this.validatorType.existPropertyInObjectMul(tocIniciative, 
            ['sdg_results', 'impact_area_results, action_area_results', 'output_outcome_results'])){
                return await this.saveInDataBase(tocIniciative.sdg_results)
        }

    }

    async mappingAndSaveSdgResults(sdgResults:any){
        let listSdgSave = []
        let relationSdgTarget = [];
        let relationSdgIndicator = [];
        if(this.validatorType.validatorIsArray(sdgResults)){
            sdgResults.forEach(async (resp)=>{
                if(this.validatorType.existPropertyInObjectMul(resp, 
                    ['sdg_id', 'toc_result_id', 
                    'sdg_contribution','sdg_targets', 'sdg_indicators'])){
                        const sdgResultDto = new CreateSdgResultsDto;
                        sdgResultDto.sdg_id = typeof resp.sdg_id == 'number' ? resp.sdg_id : null;
                        sdgResultDto.toc_result_id = typeof resp.toc_result_id == 'string' ? resp.toc_result_id : null;
                        sdgResultDto.sdg_contribution = typeof resp.sdg_contribution == 'string' ? resp.sdg_contribution : null;
                        sdgResultDto.is_active = true;
                        this.validatorType.deletebyAllRelationOutcome(resp.toc_result_id);
                        await this.mappingRelationSdgResult(resp, resp.toc_result_id, relationSdgTarget, relationSdgIndicator)
                        listSdgSave.push(sdgResultDto)
                    }
            })
        }

        return {listSdgSave, relationSdgTarget, relationSdgIndicator};
    }

    async mappingRelationSdgResult(sdgResult:any, toc_result_id:string, relationSdgTarget:any[], relationSdgIndicator:any[]){
            if(this.validatorType.validatorIsArray(sdgResult.sdg_targets) && 
        sdgResult.sdg_targets.length > 0){
            for(let resp of sdgResult.sdg_targets){
                if(this.validatorType.existPropertyInObjectMul(resp, 
                    ['sdg_target_id', 'active'])){
                        const sdgTargetsDto = new TocSdgResultsSdgTargetsDto();
                        sdgTargetsDto.sdg_toc_result_id = toc_result_id;
                        sdgTargetsDto.sdg_target_id = typeof resp.sdg_target_id == 'number' ? resp.sdg_target_id : null;
                        sdgTargetsDto.is_active = typeof resp.active == 'boolean' ? resp.active : null;
                         relationSdgTarget.push(sdgTargetsDto);
                    }
            }
            
            
        }
        if(this.validatorType.validatorIsArray(sdgResult.sdg_indicators) && 
        sdgResult.sdg_indicators.length > 0){
             sdgResult.sdg_indicators.forEach(async (resp)=> {
                if(this.validatorType.existPropertyInObjectMul(resp, 
                    ['sdg_indicator', 'active'])){
                        const sdgIndicatorDto = new TocSdgResultsSdgIndicatorsDto;
                        sdgIndicatorDto.sdg_toc_result_id = toc_result_id;
                        sdgIndicatorDto.sdg_indicator_id = typeof resp.sdg_indicator_id == 'number' ? resp.sdg_indicator_id : null;
                         relationSdgIndicator.push(sdgIndicatorDto);
                    }
            })
            
        }
        
    }

    async saveInDataBase(sdg:any){
        const sdgResultSave = await this.mappingAndSaveSdgResults(sdg);
        let returno;
        if(sdgResultSave != null){  
             await this.sdgTarget.save(sdgResultSave.relationSdgTarget)
             await this.sdgIndicator.save(sdgResultSave.relationSdgIndicator);
        }

        return sdgResultSave;
    }


}