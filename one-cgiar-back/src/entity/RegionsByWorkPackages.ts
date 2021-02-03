import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { WorkPackages } from './WorkPackages';

@Entity('regions_by_work_packages')
export class RegionsByWorkPackages extends UpdatedCreatedAt {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => WorkPackages)
    @JoinColumn()
    wrkPkgId!: WorkPackages;

    @Column({type: 'int'})
    region_id: number;
}