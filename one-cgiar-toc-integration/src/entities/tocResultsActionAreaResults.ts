import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_results_action_area_results')
export class TocResultsActionAreaResults{
    @PrimaryGeneratedColumn()
    toc_result_id:string;
    @Column()
    action_area_toc_result_id:string;
    //@Column()
    //is_active:boolean;
}