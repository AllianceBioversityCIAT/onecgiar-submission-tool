export interface IsBody{
    highlights: IsHighlight[],
    context?:IsContext
}

export interface IsHighlight {
  id?: number;
  name: string;
  description: string;
}

export interface IsContext{
    id:number;
    initvStg?:number;
    challenge_statement:string;
    smart_objectives:string;
    active:boolean
}