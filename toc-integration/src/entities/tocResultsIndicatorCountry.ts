import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_result_indicator_country')
export class TocResultIndicatorCountry{
    @PrimaryGeneratedColumn()
    toc_result_id: string;
    @Column()
    clarisa_countries_id:number;

}