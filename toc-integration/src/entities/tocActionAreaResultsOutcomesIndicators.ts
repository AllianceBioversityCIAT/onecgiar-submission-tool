import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_action_area_results_outcomes_indicators')
export class TocActionAreaResultsOutcomesIndicators{
    @PrimaryGeneratedColumn()
    toc_action_area_results_id: number;
    @Column()
    action_areas_outcomes_indicators_id : number;
    @Column()
    is_active : boolean;
    @Column()
    toc_action_area_results_idtoc : string;
}