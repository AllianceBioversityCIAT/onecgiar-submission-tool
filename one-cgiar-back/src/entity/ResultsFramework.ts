import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('results_framework')
export class ResultsFramework extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  melia_id: number;

  @Column({type: 'text'})
  name: string;

  @Column({type: 'tinyint'})
  active: boolean;
}
