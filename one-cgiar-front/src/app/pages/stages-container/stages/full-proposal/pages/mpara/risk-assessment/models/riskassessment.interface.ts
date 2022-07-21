import { Opportunity } from './opportunity.interface';
export interface Riskassessment{
    id?: number,
    risks_achieving_impact?: string,
    description_risk?: string,
    likelihood?: number,
    impact?: number,
    risk_score?: number,
    active?: boolean,
    manage_plan_risk_id?: number,
    selected?:boolean,
    idx?:number;
    editable?:boolean,
    risks_theme?:string,
    add_by_user?:boolean,
    risks_theme_created?:any;
    risks_achieving_impact_created?:any
    opportinities?: Opportunity []
    risk_id?:any;
}