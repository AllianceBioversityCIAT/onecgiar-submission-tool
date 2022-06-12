import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {Results} from './Results';

@Entity('results_countries')
export class ResultsCountries extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  country_id: number;

  @Column({type: 'int'})
  results_id: number;

  @Column({type: 'tinyint'})
  active: boolean;
}
