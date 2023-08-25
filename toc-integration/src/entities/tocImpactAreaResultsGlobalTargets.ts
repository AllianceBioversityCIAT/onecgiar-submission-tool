import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_impact_area_results_global_targets')
export class TocImpactAreaResultsGlobalTargets{
    @PrimaryGeneratedColumn()
    toc_impact_area_results_id : number;
    @Column()
    global_targets_id: number;
    @Column()
    is_active:boolean;
    @Column()
    toc_impact_area_results_id_toc:string;
}