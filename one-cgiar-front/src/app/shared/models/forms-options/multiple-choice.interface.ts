export interface multipleChoiceOptions{
    required?:boolean;
    readonly?:boolean;
    inputTitle:string;
    description?:string;
    // form:FormGroup;
    chipName:string;
    // maxWords:number;
    selectList:any[];
    selectedList:any[];
    selectItemName:string;
    selectItemId:string|number;
    selectedItemId:string|number;
    toDisableList:[];
    showChips:boolean;
    attributeNameToSearch:string;
    service:{
        frontendSearchAttribute:string
        serviceTS:any;
        functionName:string;
        objectName:string;
    }
    
    
}