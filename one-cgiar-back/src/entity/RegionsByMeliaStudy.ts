import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByStages} from './InititativesByStages';
import { MeliaStudiesActivities } from './MeliaStudiesActivities';

@Entity('regions_by_melia_study')
export class RegionsByMeliaStudy extends UpdatedCreatedAt {
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
  initvStgId: number;

  @ManyToOne(() => InitiativesByStages)
  @JoinColumn({name: "initvStgId"})
  initvStg!: InitiativesByStages;

  @Column({type: 'int'})
  region_id: number;
}
