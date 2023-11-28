import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_sdg_results_sdg_targets')
export class TocSdgResultsSdgTargets{
    @PrimaryGeneratedColumn()
    toc_sdg_results_id:number;

    @Column({type: 'int'})
    sdg_target_id: number;

    @Column({type: 'tinyint'})
    is_active:boolean;

    @Column({ type: 'varchar',
    length:500})
    toc_sdg_results_id_toc:string;
}