import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {Results} from './Results';

@Entity('results_indicators')
export class ResultsIndicators extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  name: string;

  @Column({type: 'text'})
  unit_measurement: string;

  @Column({type: 'int'})
  results_id: number;

  @Column({type: 'text'})
  baseline_value: string;

  @Column({type: 'int'})
  baseline_year: number;

  @Column({type: 'text'})
  target_value: string;

  @Column({type: 'int'})
  target_year: number;

  @Column({type: 'tinyint'})
  active: boolean;

  @Column({type: 'text'})
  data_source: string;

  @Column({type: 'text'})
  data_collection_method: string;

  @Column({type: 'text'})
  frequency_data_collection: string;

  @Column({type: 'text'})
  toc_result_indicator_id: string;
}
