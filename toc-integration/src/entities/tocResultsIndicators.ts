import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_results_indicators')
export class TocResultsIndicators{
    @PrimaryGeneratedColumn()
    toc_result_indicator_id : string;
    @Column()
    toc_results_id: number;
    @Column()
    indicator_description:string;
    @Column()
    unit_messurament:string;
    @Column()
    type_value:string;
    @Column()
    baseline_value:string;
    @Column()
    baseline_date:string;
    @Column()
    target_value:string;
    @Column()
    target_date:string;
    @Column()
    data_colletion_source:string;
    @Column()
    data_collection_method:string;
    @Column()
    frequency_data_collection:string;
    @Column()
    location:string;
    @Column()
    is_active:boolean;
    @Column()
    toc_result_id_toc:string;
    @Column()
    main:boolean;
    @Column()
    create_date:string;
    @Column()
    type_name:string;
    @Column()
    related_node_id:string;
}