import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_impact_area_results_global_targets')
export class TocImpactAreaResultsGlobalTargets{
    @PrimaryGeneratedColumn()
    impact_area_toc_result_id : string;
    @Column()
    global_target_id: number;
    @Column()
    is_active:boolean;
}