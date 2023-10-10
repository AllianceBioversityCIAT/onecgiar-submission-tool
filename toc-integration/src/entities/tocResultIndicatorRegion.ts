import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_result_indicator_region')
export class TocResultIndicatorRegion{
    @PrimaryGeneratedColumn()
    toc_result_id: string;
    @Column()
    clarisa_regions_id:number;

}