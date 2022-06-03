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
import {MeliaStudiesActivities} from './MeliaStudiesActivities';

@Entity('countries_by_melia_study')
export class CountriesByMeliaStudy extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('tinyint')
  active: boolean;

  @Column({type: 'int'})
  meliaStudyId: number;

  @ManyToOne(() => MeliaStudiesActivities)
  @JoinColumn({name: 'meliaStudyId'})
  meliaStd!: MeliaStudiesActivities;

  @Column({type: 'int'})
  initvStgId: number;

  @ManyToOne(() => InitiativesByStages)
  @JoinColumn({name: 'initvStgId'})
  initvStg!: InitiativesByStages;

  @Column({type: 'int'})
  country_id: number;
}
