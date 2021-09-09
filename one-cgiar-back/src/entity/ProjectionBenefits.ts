import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { WorkPackages } from './WorkPackages';

@Entity('projection_benefits')
export class ProjectionBenefits extends UpdatedCreatedAt {
    @PrimaryGeneratedColumn()
    id: number

    @Column('tinyint')
    active: boolean

    @OneToOne(() => WorkPackages)
    @JoinColumn()
    wrkPkg!: WorkPackages;

    @Column({type: 'int'})
    impact_area_id: number;
   
    @Column({type: 'int'})
    impact_area_indicator_id: number;

    @Column({length: '500'})
    @IsNotEmpty()
    impact_area_indicator_name: string
    
    @Column({length: '500'})
    @IsNotEmpty()
    impact_area_name: string
    
    @Column({length: '1000'})
    @IsNotEmpty()
    notes: string

    @Column({type: 'int'})
    initvStgId: number;

    @Column({type: 'int'})
    depth_scale_id: number;

    @Column({type: 'int'})
    probability_id: number;
    
    @Column('tinyint')
    impact_area_active: boolean


}