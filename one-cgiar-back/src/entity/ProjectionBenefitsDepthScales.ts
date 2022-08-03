import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProjectionBenefits } from './ProjectionBenefits';
import { DepthScales } from './DepthScales';

@Entity('projection_benefits_depth_scales')
export class ProjectionBenefitsDepthScales{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProjectionBenefits, (projectionBenefits ) => projectionBenefits.projectionBenefitsDepthScales)
    @JoinColumn({name: 'projectionBenefitsId'})
    projectionBenefitsId: ProjectionBenefits;

    @ManyToOne(() => DepthScales, (depthScales ) => depthScales.projectionBenefitsDepthScales)
    @JoinColumn({name: 'depthScalesId'})
    depthScalesId: ProjectionBenefits;

    @Column()
    active: boolean;

}

