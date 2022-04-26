import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByStages} from './InititativesByStages';
import { Users } from './Users';

@Entity('isdc_responses')
export class ISDCResponses extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  initvStgId: number;
  
  @Column({type: 'text', default: null})
  isdc_recommendation: string;
  
  @Column({type: 'text', default: null})
  response: string;
  
  @Column({type: 'text', default: null})
  updated_response: string;

  @Column({default: false})
  is_deleted: boolean;

  @ManyToOne(() => InitiativesByStages)
  initvStg!: InitiativesByStages;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user!: Users;
}
