import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_sdg_results_sdg_indicators')
export class TocSdgResultsSdgIndicators{
    @PrimaryGeneratedColumn()
    sdg_toc_result_id:string;

    @Column({type: 'int'})
    sdg_indicator_id: number;
}