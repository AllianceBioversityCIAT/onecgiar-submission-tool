import { Opportunity } from './opportunity.interface';
export interface Riskassessment{
    id: number,
    risks_achieving_impact?: string,
    description_risk?: string,
    likelihood?: number,
    impact?: number,
    risk_score?: number,
    active: boolean,
    manage_plan_risk_id?: number,
    selected?:boolean,
    idx?:number;
    opportinities?: Opportunity []
}