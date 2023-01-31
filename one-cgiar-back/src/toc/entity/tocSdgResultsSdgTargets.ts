import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_sdg_results_sdg_targets')
export class TocSdgResultsSdgTargets{
    @Column({
        type: 'varchar',
        length:50
    })
    sdg_toc_result_id:string;
    @Column({type: 'int'})
    sdg_target_id: number;

    @Column({type: 'tinyint'})
    is_active:boolean;
}