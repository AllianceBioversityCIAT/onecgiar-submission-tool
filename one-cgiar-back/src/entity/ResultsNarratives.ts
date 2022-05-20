import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByStages} from './InititativesByStages';

@Entity('results_narratives')
export class ResultsNarratives extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  impact_area_contribution: string;

  @Column({type: 'text'})
  end_init_outcomes: string;

  @Column({type: 'tinyint'})
  active: boolean;

  @Column({type: 'int'})
  initvStgId: number;

  @OneToOne(() => InitiativesByStages)
  @JoinColumn()
  initvStg!: InitiativesByStages;
}
