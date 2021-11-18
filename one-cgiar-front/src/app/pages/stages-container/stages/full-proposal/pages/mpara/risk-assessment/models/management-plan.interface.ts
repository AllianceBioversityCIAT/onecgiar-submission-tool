import { Riskassessment } from './riskassessment.interface';
export interface managementPlan{
    id: number,
    management_plan?: string,
    active: boolean,
    section: string,
    updateFiles: [],
    riskassessment: Riskassessment [];
}