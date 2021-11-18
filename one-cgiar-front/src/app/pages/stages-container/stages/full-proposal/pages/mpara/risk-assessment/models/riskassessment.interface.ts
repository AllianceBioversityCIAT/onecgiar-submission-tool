interface Opportinities {
    id: number,
    opportunities_description: string,
    risk_assessment_id: number,
}


export interface Riskassessment{
    id: number,
    risks_achieving_impact: string,
    description_risk: string,
    likelihood: number,
    impact: number,
    risk_score: number,
    active: boolean,
    manage_plan_risk_id: number,
    opportinities: Opportinities []
}