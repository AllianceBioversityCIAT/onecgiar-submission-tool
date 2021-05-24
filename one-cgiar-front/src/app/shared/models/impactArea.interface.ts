import { impactAreaIndicator } from './impactAreaIndicator.interface';
import { ProjectionOfBenefits } from './projection-of-benefits.interface';
import { Timeframe } from './timeframes.interface';
export interface impactArea{
    description?: string
    id?: number
    indicators?: impactAreaIndicator []
    name?: string
    projectedBenefits?: ProjectionOfBenefits [],
    timeFrames?:Timeframe[]
}

