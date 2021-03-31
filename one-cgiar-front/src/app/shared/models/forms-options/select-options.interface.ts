import { FormGroup } from "@angular/forms";

export interface selectOptions{
    required?:boolean;
    readonly?:boolean;
    inputTitle:string;
    description?:string;
    form:FormGroup;
    formControlName:string;
    maxWords:number;
    selectList:[];
    selectItemName:string;
    selectItemId:string|number;
}