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
}