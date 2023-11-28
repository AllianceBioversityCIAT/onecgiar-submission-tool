import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_results_countries')
export class TocResultsCountries{
    @PrimaryGeneratedColumn()
    toc_result_id: string;
    @Column()
    clarisa_countries_id:number;
    @Column()
    is_active:boolean;
}