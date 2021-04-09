import { FormGroup } from "@angular/forms";

export interface inputOptions{
    required?:boolean
    readonly?:boolean
    inputTitle:string
    description?:string
    form:FormGroup;
    formControlName:string;
    maxWords?:number;
}