import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_action_area_results')
export class TocActionAreaResults{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    toc_result_id: string;
    @Column()
    action_areas_id: number;
    @Column()
    statement: string;
    @Column()
    outcome_id:number;
    @Column()
    is_active: boolean;
    @Column()
    phase:string;
    @Column()
    id_toc_initiative:string;
}