import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_results')
export class TocResults{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    toc_result_id:string;
    @Column()
    result_type:number;
    @Column()
    result_title:string;
    @Column()
    result_description:string;
    @Column()
    outcome_type:string;
    @Column()
    phase:string;
    @Column()
    is_global:boolean;
    @Column()
    is_active:boolean;
    @Column()
    work_packages_id:number;
    @Column()
    id_toc_initiative:string;
    @Column()
    version_id :string;
}