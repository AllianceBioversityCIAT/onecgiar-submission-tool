import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_impact_area_results_sdg_results')
export class TocImpactAreaResultsSdgResults{
    @PrimaryGeneratedColumn()
    impact_area_toc_result_id: string;
    @Column()
    sdg_toc_result_id: string;
    @Column()
    is_active:boolean;
}