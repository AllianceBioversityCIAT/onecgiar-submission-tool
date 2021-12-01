import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('clarisa_projected_benefits')
export class ClarisaProjectedBenefits extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  impactAreaName: string;

  @Column({type: 'int'})
  impactAreaIndicator: number;

  @Column({type: 'text'})
  impactAreaIndicatorName: string;

  @Column({type: 'boolean'})
  isApplicableProjectedBenefits: boolean;

  @Column({type: 'int'})
  targetYear: number;

  @Column({type: 'text'})
  targetUnit: string;

  @Column({type: 'text'})
  value: string;

  @Column({type: 'json'})
  depthScales: JSON;

  @Column({type: 'json'})
  weightingValues: JSON;
}
