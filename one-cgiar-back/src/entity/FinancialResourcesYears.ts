import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {FinancialResources} from './FinancialResources';

@Entity('financial_resources_years')
export class FinancialResourcesYears extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'decimal'})
  value: number;

  @Column({type: 'tinyint'})
  active: boolean;

  @Column({type: 'varchar'})
  year: string;

  @ManyToOne(() => FinancialResources)
  @JoinColumn()
  financialResources!: FinancialResources;
}
