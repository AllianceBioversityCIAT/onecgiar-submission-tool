import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_results_impact_area_results')
export class TocResultsImpactAreaResults{
    @PrimaryGeneratedColumn()
    toc_results_id:string;
    @Column()
    toc_impact_area_results_id:string;
    @Column()
    is_active:boolean;
    @Column()
    toc_results_id_toc:string;
    @Column()
    toc_impact_area_results_id_toc:string;
}