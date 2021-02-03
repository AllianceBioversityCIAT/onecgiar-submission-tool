import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { WorkPackages } from './WorkPackages';

@Entity('countries_by_work_packages')
export class CountriessByWorkPackages extends UpdatedCreatedAt {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => WorkPackages)
    @JoinColumn()
    wrkPkgId!: WorkPackages;

    @Column({type: 'int'})
    country_id: number;
}