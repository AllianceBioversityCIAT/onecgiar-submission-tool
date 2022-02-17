import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  OneToOne
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {Initiatives} from './Initiatives';
import {Stages} from './Stages';
import {Statuses} from './Statuses';

@Entity('initiatives_by_stages')
export class InitiativesByStages extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('tinyint')
  active: boolean;

  @Column('tinyint')
  global_dimension: boolean;

  @ManyToOne(() => Stages, (stage) => stage.initiatives)
  public stage!: Stages;

  @ManyToOne(() => Initiatives, (initiative) => initiative.initvByStages)
  public initiative!: Initiatives;

  @OneToOne(() => Statuses)
  @JoinColumn()
  status!: Statuses;
}
