import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('clarisa_impact_areas_indicators')
export class ClarisaImpactAreasIndicators extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  indicatorStatement: string;

  @Column({type: 'int'})
  impactAreaId: number;

  @Column({type: 'text'})
  impactAreaName: string;

  @Column({type: 'int'})
  targetYear: number;

  @Column({type: 'text'})
  targetUnit: string;

  @Column({type: 'text'})
  value: string;

  @Column({type: 'boolean'})
  isAplicableProjectedBenefits: boolean;
}
