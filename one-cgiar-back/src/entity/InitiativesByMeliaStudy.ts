import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import { Initiatives } from './Initiatives';
import { MeliaStudiesActivities } from './MeliaStudiesActivities';

@Entity('initiatives_by_melia_study')
export class InitiativesByMeliaStudy extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('tinyint')
  active: boolean;

  @Column({type: 'int'})
  meliaStudyId: number;

  @ManyToOne(() => MeliaStudiesActivities)
  @JoinColumn({name: "meliaStudyId"})
  meliaStd!: MeliaStudiesActivities;

  @Column({type: 'int'})
  initiativeId: number;

  @ManyToOne(() => Initiatives)
  @JoinColumn({name: "initiativeId"})
  initiative!: Initiatives;

}
