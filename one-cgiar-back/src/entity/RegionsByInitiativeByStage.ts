import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByStages} from './InititativesByStages';
import {WorkPackages} from './WorkPackages';

@Entity('regions_by_initiative_by_stage')
export class RegionsByInitiativeByStage extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => WorkPackages)
  @JoinColumn()
  wrkPkg!: WorkPackages;

  @OneToOne(() => InitiativesByStages)
  @JoinColumn()
  initvStg!: InitiativesByStages;

  @Column('tinyint')
  active: boolean;

  @Column({type: 'int'})
  region_id: number;
}
