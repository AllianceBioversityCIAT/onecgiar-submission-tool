import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_results_impact_area_results')
export class TocResultsImpactAreaResults{
    @PrimaryGeneratedColumn()
    toc_result_id:string;
    @Column()
    impact_area_toc_result_id:string;
    @Column()
    is_active:boolean;
}