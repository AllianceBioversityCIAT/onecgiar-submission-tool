import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('risk_assessment')
export class RiskAssessment extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  risks_achieving_impact: string;

  @Column({type: 'text'})
  risks_theme: string;

  @Column({type: 'text'})
  description_risk: string;

  @Column({type: 'int'})
  likelihood: number;

  @Column({type: 'int'})
  impact: number;

  @Column({type: 'int'})
  risk_score: number;

  @Column({type: 'int'})
  manage_plan_risk_id: number;

  @Column({type: 'tinyint'})
  active: boolean;

  @Column({type: 'tinyint'})
  add_by_user: boolean;
}
