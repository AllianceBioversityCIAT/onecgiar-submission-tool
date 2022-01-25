import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {Results} from './Results';

@Entity('results_data_management')
export class ResultsDataManagement extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  data_source: string;

  @Column({type: 'text'})
  data_collection_method: string;

  @Column({type: 'text'})
  frequency_data_collection: string;

  @Column({type: 'int'})
  results_id: number;

  @Column({type: 'tinyint'})
  active: boolean;

  @OneToOne(() => Results)
  @JoinColumn()
  resultsId!: Results;
}
