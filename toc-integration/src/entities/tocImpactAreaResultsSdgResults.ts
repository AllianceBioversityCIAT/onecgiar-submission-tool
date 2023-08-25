import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_impact_area_results_sdg_results')
export class TocImpactAreaResultsSdgResults{
    @PrimaryGeneratedColumn()
    toc_impact_area_results_id: string;
    @Column()
    toc_sdg_results_id: string;
    @Column()
    is_active:boolean;
    @Column()
    toc_sdg_results_id_toc:string;
    @Column()
    toc_impact_area_results_id_toc:string;
}