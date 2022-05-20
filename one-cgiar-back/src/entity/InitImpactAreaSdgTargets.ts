import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByStages} from './InititativesByStages';
import {Statuses} from './Statuses';

@Entity('init_impact_area_sdg_targets')
export class InitImpactAreaSdgTargets extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  sdg_target_id: number;

  @Column({type: 'tinyint'})
  active: boolean;

  @Column({type: 'int'})
  initvStgId: number;

  @Column({type: 'int'})
  impact_area_id: number;

  @OneToOne(() => InitiativesByStages)
  @JoinColumn()
  initvStg!: InitiativesByStages;
}
