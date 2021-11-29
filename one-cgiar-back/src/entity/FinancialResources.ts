import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByStages} from './InititativesByStages';

@Entity('financial_resources')
export class FinancialResources extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  initvStgId: number;

  @Column({type: 'text'})
  financial_type: string;

  @Column({type: 'int'})
  financial_type_id: number;

  @Column({type: 'tinyint'})
  active: boolean;

  @Column({type: 'text'})
  col_name: string;

  @Column({type: 'text'})
  table_name: string;

  @ManyToOne(() => InitiativesByStages)
  @JoinColumn()
  initvStg!: InitiativesByStages;
}
