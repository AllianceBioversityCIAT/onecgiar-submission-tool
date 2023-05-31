import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_results_indicators')
export class TocResultsIndicators{
    @PrimaryGeneratedColumn()
    toc_result_indicator_id : string;
    @Column()
    toc_result_id: string;
    @Column()
    indicator_description:string;
    @Column()
    unit_messurament:string;
    @Column()
    type_value:string;
    @Column()
    baseline_value:string;
    @Column()
    baseline_date:Date;
    @Column()
    target_value:string;
    @Column()
    target_date:Date;
    @Column()
    data_colletion_source:string;
    @Column()
    data_collection_method:string;
    @Column()
    frequency_data_collection:string;
    @Column()
    location:string;
    @Column()
    countries_id:string;
    @Column()
    regions_id:string;
    @Column()
    is_active:boolean;
}