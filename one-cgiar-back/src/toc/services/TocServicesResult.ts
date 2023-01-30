import {getConnection, getCustomRepository, getRepository} from 'typeorm';
import {ValidatorTypes} from '../validators/validatorType'
import {ErrorValidators} from '../validators/errorsValidators'
import {CreateSdgResultsDto} from '../dto/tocSdgResults'

export class TocServicesResults{
    public queryRunner = getConnection().createQueryRunner().connection;
    public validatorType = new ValidatorTypes()
    public errorMessage = new ErrorValidators()

    async splitInformation(tocResultDashboard:any){
        if(this.validatorType.validatorIsObject(tocResultDashboard) &&  this.validatorType.validatorIsArray(tocResultDashboard) == false){
            if(this.validatorType.existPropertyInObject(tocResultDashboard, 'sdg_results')){
                if(this.validatorType.validatorIsArray(tocResultDashboard.sdg_results)){
                    return this.saveSdgResults(tocResultDashboard.sdg_results)
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
        sdg_results.forEach(element => {
            
            if(this.validatorType.existPropertyInObject(element, 'toc_result_id') &&
                this.validatorType.existPropertyInObject(element, 'sdg_id') &&
                this.validatorType.existPropertyInObject(element, 'sdg_contribution')){
                    const dtoSdgResults = new CreateSdgResultsDto;
                    dtoSdgResults.toc_result_id = element.toc_result_id;
                    dtoSdgResults.sdg_id = element.sdg_id;
                    dtoSdgResults.sdg_contribution = element.sdg_contribution;
                    dtoSdgResults.is_active = true;
                    listElementValid.push(dtoSdgResults);
                }
            else{
                listElementNotValid.push(element);
            }
            
        });

        return this.errorMessage.createSdgResultMenssage(listElementValid, listElementNotValid, 200);
    }



}