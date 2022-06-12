import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByStages} from './InititativesByStages';

@Entity('budget')
export class Budget extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  value: string;

  @Column({type: 'text'})
  table_name: string;

  @Column({type: 'text'})
  col_name: string;

  @Column({type: 'tinyint'})
  active: boolean;

  @OneToOne(() => InitiativesByStages)
  @JoinColumn()
  initvStg!: InitiativesByStages;
}
