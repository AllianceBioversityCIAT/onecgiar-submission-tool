export interface multipleChoiceOptions{
    required?:boolean;
    readonly?:boolean;
    inputTitle:string;
    description?:string;
    // form:FormGroup;
    chipName:string;
    // maxWords:number;
    selectList:[];
    selectedList:any[];
    selectItemName:string;
    selectItemId:string|number;
    toDisableList:[];
}