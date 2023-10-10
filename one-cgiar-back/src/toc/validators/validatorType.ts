import {getConnection, getRepository, getCustomRepository} from 'typeorm';

import { TocSdgResultsSdgIndicators } from '../entity/tocSdgResultsSdgIndicators';
import { TocSdgResultsSdgTargets } from '../entity/tocSdgResultsSdgTargets';
import { TocImpactAreaResultsGlobalTargets } from '../entity/tocImpactAreaResultsGlobalTargets';
import { TocImpactAreaResultsImpactAreaIndicators } from '../entity/tocImpactAreaResultsImpactAreaIndicators';
import { TocImpactAreaResultsSdgResults } from '../entity/tocImpactAreaResultsSdgResults';
import { TocActionAreaResultsOutcomesIndicators } from '../entity/tocActionAreaResultsOutcomesIndicators';
import { TocActionAreaResultsImpactAreaResults } from '../entity/tocActionAreaResultsImpactAreaResults';
import { TocResultsIndicators } from '../entity/tocResultsIndicators';
import { TocResultsActionAreaResults } from '../entity/tocResultsActionAreaResults';
import { TocResultsImpactAreaResults } from '../entity/tocResultsImpactAreaResults';
import { TocResultsSdgResults } from '../entity/tocResultsSdgResults';
import { TocResultsRegions } from '../entity/tocResultsRegions';
import { TocResultsCountries } from '../entity/tocResultsCountries';

export class ValidatorTypes{
    private sdgTarget = getRepository(TocSdgResultsSdgTargets);
    private sdgIndicator = getRepository(TocSdgResultsSdgIndicators);
    private globalTarget = getRepository(TocImpactAreaResultsGlobalTargets);
    private impactAreaIndicator = getRepository(TocImpactAreaResultsImpactAreaIndicators);
    private impactAreaSdg = getRepository(TocImpactAreaResultsSdgResults);
    private outcomeIndicators = getRepository(TocActionAreaResultsOutcomesIndicators);
    private impactAreas = getRepository(TocActionAreaResultsImpactAreaResults); 
    private indicators = getRepository(TocResultsIndicators);
    private tocActionArea = getRepository(TocResultsActionAreaResults);
    private tocImpactArea = getRepository(TocResultsImpactAreaResults);
    private tocSdg = getRepository(TocResultsSdgResults);
    private tocRegions = getRepository(TocResultsRegions)
    private tocCountries = getRepository(TocResultsCountries)

    async validatorIsObject(value:any){
        return value instanceof Object; 
    }

    validatorIsArray(value:any):Boolean{
        return Array.isArray(value);
    }

    existPropertyInObject(value:any, nameProperty: string){
        return value.hasOwnProperty(nameProperty);
    }

    existPropertyInObjectMul(object:any, namesProperty:any){
        if(this.validatorIsArray(namesProperty)){
            namesProperty.forEach(element => {
                if(this.existPropertyInObject(object, element)== false){
                    return false;
                }
            });
        }else{
            return 'Expect array';
        }
        return true;
    }

    validExistNull(object:any){
        for(const x in object){
            if(object[x] == null){
                return false;
            }
        }
    return true;
    }

    validExistId(object:any, id:string){
        let estado = false
        object.forEach(element => {
            if(id.localeCompare(element.sdg_results.toc_result_id) == 0){
                estado = true;
            }
        });
       return estado; 
    }

    validExistIdImpact(object:any, id:string){
        let estado = false
        object.forEach(element => {
            if(id.localeCompare(element.impact_area.toc_result_id) == 0){
                estado = true;
            }
        });
       return estado; 
    }

    validExistIdAction(object:any, id:string){
        let estado = false
        object.forEach(element => {
            if(id.localeCompare(element.action_area.toc_result_id) == 0){
                estado = true;
            }
        });
       return estado; 
    }

    async validRepetInformation(listValidate:any, data:any){
        let estado = true;
        
        listValidate.forEach(element => {
            if(element.sdg_toc_result_id.localeCompare(data.sdg_toc_result_id) == 0){
                estado = false;
                console.log('entre');
                
            }
        });

        return estado;
    }

    async deleteRepets(array:any){
        let arrayReturn = []
        let hash = {}
        array.forEach(function(current) {
            let exists
            if(!hash[current.toc_result_id] == true){
                hash[current.toc_result_id] = true;
                arrayReturn.push(current);  
            }

          });
          
        return arrayReturn;
    }

    async filterListRegister(array:any, id:string, identificator:string){
        let estado = false;
        array.filter((resp)=>{
            if(resp[identificator] == id){
                estado = true;
            }
        })

        return estado;
    }

    async deletebyAllRelationSdgs(toc_result_id:string){
        await this.sdgTarget.delete(toc_result_id)
        await this.sdgIndicator.delete(toc_result_id)
        return true;
    }

    async deletebyAllRelationImpactAre(toc_result_id:string){
        await this.globalTarget.delete(toc_result_id)
        await this.impactAreaIndicator.delete(toc_result_id)
        await this.impactAreaSdg.delete(toc_result_id)
        return true;
    }

    async deletebyAllRelationActionArea(toc_result_id:string){
        await this.outcomeIndicators.delete(toc_result_id)
        await this.impactAreas.delete(toc_result_id)
        return true;
    }

    async deletebyAllRelationOutcome(toc_result_id:string){
        await this.indicators.delete(toc_result_id)
        await this.tocActionArea.delete(toc_result_id)
        await this.tocImpactArea.delete(toc_result_id)
        await this.tocSdg.delete(toc_result_id)
        await this.tocRegions.delete(toc_result_id)
        await this.tocCountries.delete(toc_result_id)
        return true;
    }
    
}