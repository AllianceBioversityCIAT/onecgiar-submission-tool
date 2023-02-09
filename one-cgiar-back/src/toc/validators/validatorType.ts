

export class ValidatorTypes{
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

    
}