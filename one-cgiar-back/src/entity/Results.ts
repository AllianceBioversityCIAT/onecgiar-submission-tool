import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByStages} from './InititativesByStages';

@Entity('results')
export class Results extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  result_type_id: number;

  @Column({type: 'text'})
  result_title: string;

  @Column({type: 'tinyint'})
  is_global: boolean;

  @Column({type: 'tinyint'})
  active: boolean;

  @Column({type: 'int'})
  initiatives_by_stages_id: number;

  @OneToOne(() => InitiativesByStages)
  @JoinColumn()
  initvStg!: InitiativesByStages;
}
