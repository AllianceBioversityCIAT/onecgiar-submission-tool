import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_impact_area_results_impact_areas_indicators')
export class TocImpactAreaResultsImpactAreaIndicators{
    @PrimaryGeneratedColumn()
    impact_area_toc_result_id: string;
    @Column()
    impact_areas_indicators_id: number;
    @Column()
    is_active:boolean;
}