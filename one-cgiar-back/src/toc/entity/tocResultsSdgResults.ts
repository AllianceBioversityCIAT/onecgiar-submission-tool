import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_results_sdg_results')
export class TocResultsSdgResults{
    @PrimaryGeneratedColumn()
    toc_result_id: string;
    @Column()
    sdg_toc_result_id:string;
    @Column()
    is_active:boolean;
}