import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

export interface selectOptions{
    required?:boolean;
    readonly?:boolean;
    inputTitle:string;
    description?:string;
    form:FormGroup;
    formControlName:string;
    formControlId:string;
    maxWords:number;
    selectList:[];
    selectItemName:string;
    selectItemId:string|number;
    toDisableList:[];
    attributeNameToSearch:string;
    serviceFunction:string;
    initialSearchText:string;
    service:{
        frontendSearchAttribute:string
        serviceTS:any;
        functionName:string;
        objectName:string;
    }
}