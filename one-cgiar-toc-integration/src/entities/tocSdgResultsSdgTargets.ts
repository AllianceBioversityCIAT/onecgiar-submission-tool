import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_sdg_results_sdg_targets')
export class TocSdgResultsSdgTargets{
    @PrimaryGeneratedColumn()
    sdg_toc_result_id:string;

    @Column({type: 'int'})
    sdg_target_id: number;

    @Column({type: 'tinyint'})
    is_active:boolean;
}