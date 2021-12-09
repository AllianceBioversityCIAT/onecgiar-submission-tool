import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByStages} from './InititativesByStages';

@Entity('context')
export class Context extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  challenge_statement: string;

  @Column({type: 'text'})
  smart_objectives: string;

  @Column({type: 'text'})
  key_learnings: string;

  @Column({type: 'text'})
  priority_setting: string;

  @Column({type: 'text'})
  comparative_advantage: string;

  @Column({type: 'text'})
  participatory_design: string;

  @OneToOne(() => InitiativesByStages)
  @JoinColumn()
  initvStg!: InitiativesByStages;
}
