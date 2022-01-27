import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('clarisa_action_areas_outcomes_indicators')
export class ClarisaActionAreasOutcomesIndicators extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  action_area_id: number;

  @Column({type: 'text'})
  action_area_name: string;

  @Column({type: 'int'})
  outcome_id: number;

  @Column({type: 'text'})
  outcome_smo_code: string;

  @Column({type: 'text'})
  outcome_statement: string;

  @Column({type: 'int'})
  outcome_indicator_id: number;

  @Column({type: 'text'})
  outcome_indicator_smo_code: string;

  @Column({type: 'text'})
  outcome_indicator_statement: string;
}
