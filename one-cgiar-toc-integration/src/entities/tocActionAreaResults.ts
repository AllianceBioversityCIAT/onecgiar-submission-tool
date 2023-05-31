import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_action_area_results')
export class TocActionAreaResults{
    @PrimaryGeneratedColumn()
    toc_result_id: string;
    @Column()
    action_areas_id: string;
    @Column()
    statement: string;
    @Column()
    outcome_id:number;
    @Column()
    is_active: boolean;
}