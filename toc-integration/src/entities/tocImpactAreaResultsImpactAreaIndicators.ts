import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_impact_area_results_impact_areas_indicators')
export class TocImpactAreaResultsImpactAreaIndicators{
    @PrimaryGeneratedColumn()
    toc_impact_area_results_id: number;
    @Column()
    impact_areas_indicators_id: number;
    @Column()
    is_active:boolean;
    @Column()
    toc_impact_area_results_id_toc:string;
}