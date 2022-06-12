import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('initiative_team')
export class InitiativeTeam extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  category: string;

  @Column({type: 'text'})
  area_expertise: string;

  @Column({type: 'text'})
  key_accountabilities: string;

  @Column({type: 'int'})
  human_resources_id: number;

  @Column({type: 'tinyint'})
  active: boolean;
}
