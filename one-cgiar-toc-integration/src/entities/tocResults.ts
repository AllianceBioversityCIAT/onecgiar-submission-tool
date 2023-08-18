import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_results')
export class TocResults{
    @PrimaryGeneratedColumn()
    toc_result_id:string;
    @Column()
    result_type:number;
    @Column()
    work_packages_id:number;
    @Column()
    result_title:string;
    @Column()
    result_description:string;
    @Column()
    outcome_type:string;
    @Column()
    is_global:boolean;
    @Column()
    is_active:boolean;
    @Column()
    id_toc_initiative:string;
}