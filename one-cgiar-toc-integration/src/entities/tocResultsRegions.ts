import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_results_regions')
export class TocResultsRegions{
    @PrimaryGeneratedColumn()
    toc_result_id: string;
    @Column()
    clarisa_regions_id:number;
    @Column()
    is_active:boolean;
}