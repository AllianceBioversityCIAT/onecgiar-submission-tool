import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('clarisa_projected_probabilities')
export class ProjectedProbabilities extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  probabilityID: number;

  @Column({type: 'text'})
  probabilityName: string;

  @Column({type: 'text'})
  probabilityDescription: string;

  @Column({type: 'tinyint'})
  active: boolean;
}
