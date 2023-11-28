import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {Initiatives} from './Initiatives';
import {InitiativesByStages} from './InititativesByStages';
import {MeliaStudiesActivities} from './MeliaStudiesActivities';
import {Users} from './Users';

@Entity('initiatives_approval')
export class InitiativesApproval extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  initiativeId: number;

  @ManyToOne(() => Initiatives)
  @JoinColumn({name: 'initiativeId'})
  initiative!: Initiatives;

  @Column({type: 'int'})
  user_id: number;

  @ManyToOne(() => Users)
  @JoinColumn({name: 'user_id'})
  user!: Users;

  @Column()
  is_approved: boolean;

  @Column({type: 'text'})
  approved_reason: string;

  @Column({type: 'text'})
  disapproved_reason: string;
}
