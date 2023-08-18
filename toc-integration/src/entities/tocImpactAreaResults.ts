import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_impact_area_results')
export class TocImpactAreaResults{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    toc_result_id:string;
    @Column()
    impact_area_id:number;
    @Column()
    outcome_statement: string;
    @Column()
    is_active:boolean;
    @Column()
    phase:string;
    @Column()
    id_toc_initiative:string;

}