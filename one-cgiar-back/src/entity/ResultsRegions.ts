import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {Results} from './Results';

@Entity('results_regions')
export class ResultsRegions extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  region_id: number;

  @Column({type: 'int'})
  results_id: number;

  @Column({type: 'tinyint'})
  active: boolean;

}
