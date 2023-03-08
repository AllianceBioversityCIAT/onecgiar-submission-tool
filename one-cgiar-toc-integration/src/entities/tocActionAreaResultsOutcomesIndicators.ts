import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_action_area_results_outcomes_indicators')
export class TocActionAreaResultsOutcomesIndicators{
    @PrimaryGeneratedColumn()
    action_area_toc_result_id: string;
    @Column()
    action_area_outcome_indicator_id : number;
    @Column()
    is_active : boolean;
}