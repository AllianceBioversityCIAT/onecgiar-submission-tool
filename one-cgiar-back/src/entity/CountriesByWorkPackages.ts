import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {WorkPackages} from './WorkPackages';

@Entity('countries_by_work_packages')
export class CountriesByWorkPackages extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('tinyint')
  active: boolean;

  @OneToOne(() => WorkPackages)
  @JoinColumn()
  wrkPkg!: WorkPackages;

  @Column({type: 'int'})
  country_id: number;
}
