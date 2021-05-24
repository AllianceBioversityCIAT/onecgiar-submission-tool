import { impactAreaIndicator } from './impactAreaIndicator.interface';
import { ProjectionOfBenefits } from './projection-of-benefits.interface';
export interface impactArea{
    description?: string
    id?: number
    indicators?: impactAreaIndicator []
    name?: string
    projectedBenefits: ProjectionOfBenefits []
}

