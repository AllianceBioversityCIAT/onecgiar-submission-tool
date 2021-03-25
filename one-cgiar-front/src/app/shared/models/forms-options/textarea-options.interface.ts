import { FormGroup } from "@angular/forms";

export interface textareaOptions{
    required?:boolean
    readonly?:boolean
    inputValue:string
    inputTitle:string
    description?:string
    form:FormGroup;
    formControlName:string;
}