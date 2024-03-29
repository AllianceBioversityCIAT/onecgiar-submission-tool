import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import {ClarisaMeliaStudyTypes} from './ClarisaMeliaStudyTypes';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByStages} from './InititativesByStages';
import { Users } from './Users';

@Entity('melia_studies_activities')
export class MeliaStudiesActivities extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  initvStgId: number;

  // @Column({type: 'text'})
  // type_melia: string;

  @Column({type: 'int'})
  type_melia_id: number;

  @Column({type: 'text'})
  other_melia: string;

  @Column({type: 'text'})
  result_title: string;

  @Column({type: 'text'})
  anticipated_year_completion: string;

  @Column({type: 'text'})
  co_delivery: string;

  @Column({type: 'text'})
  management_decisions_learning: string;

  @Column({type: 'boolean', default: null})
  is_global: boolean;

  @Column({type: 'tinyint'})
  active: boolean;

  @OneToOne(() => InitiativesByStages)
  @JoinColumn()
  initvStg!: InitiativesByStages;

  @ManyToOne(() => Users, (user) => user.id)
  updateUser: number;
}
