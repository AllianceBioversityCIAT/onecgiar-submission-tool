import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_results_action_area_results')
export class TocResultsActionAreaResults{
    @PrimaryGeneratedColumn()
    toc_results_id:number;
    @Column()
    toc_action_area_results_id:number;
    @Column()
    is_active:boolean;
    @Column()
    toc_results_id_toc:string;
    @Column()
    toc_action_area_results_id_toc:string;
}