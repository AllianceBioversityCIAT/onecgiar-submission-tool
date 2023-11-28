import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_action_area_results_impact_area_results')
export class TocActionAreaResultsImpactAreaResults{
    @PrimaryGeneratedColumn()
    toc_action_area_results_id: number;
    @Column()
    toc_impact_area_results_id:number;
    @Column()
    is_active:boolean;
    @Column()
    toc_action_area_results_id_toc:string;
    @Column()
    toc_impact_area_results_id_toc:string;
}