import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { ProjectionBenefits } from './ProjectionBenefits';

@Entity('impact_timeframes')
export class ImpactTimeFrames extends UpdatedCreatedAt {
    @PrimaryGeneratedColumn()
    id: number

    @Column('tinyint')
    active: boolean

    @Column({length: '4'})
    @IsNotEmpty()
    year: string

    @Column({type: 'int'})
    low_scenario: number;
    
    @Column({type: 'int'})
    high_scenario: number;

    @OneToOne(() => ProjectionBenefits)
    @JoinColumn()
    proBnftId!: ProjectionBenefits;
}