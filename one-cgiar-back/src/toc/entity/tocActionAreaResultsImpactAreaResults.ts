import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_action_area_results_impact_area_results')
export class TocActionAreaResultsImpactAreaResults{
    @PrimaryGeneratedColumn()
    action_area_toc_result_id: string;
    @Column()
    impact_area_toc_result_id:string;
    @Column()
    is_active:boolean;
}