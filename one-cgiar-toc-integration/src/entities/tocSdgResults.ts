import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_sdg_results')
export class TocSdgResults{
  @PrimaryGeneratedColumn()
  toc_result_id: string;

  @Column({type: 'int'})
  sdg_id: number;

  @Column({
            type: 'varchar',
            length:50
        })
  sdg_contribution: number;

  @Column({type: 'tinyint'})
  is_active: boolean;
  
}
