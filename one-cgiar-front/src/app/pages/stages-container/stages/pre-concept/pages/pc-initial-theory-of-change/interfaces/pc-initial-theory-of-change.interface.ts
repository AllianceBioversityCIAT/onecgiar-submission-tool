export interface PcInitialTheoryOfChangeBody{
    id:number,
    initvStgId?:number,
    narrative:string,
    section:string,
    type?:string,
    active:boolean,
    files?:[],
    updateFiles:any[]
}