import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('toc_sdg_results')
export class TocSdgResults{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar',
            length:500})
  toc_result_id: string;

  @Column({type: 'int'})
  sdg_id: number;

  @Column({
            type: 'varchar',
            length:1000
        })
  sdg_contribution: string;

  @Column({type: 'tinyint'})
  is_active: boolean;
  
  @Column({type: 'varchar',length:45})
  phase:string;

  @Column({type: 'varchar',length:100})
  id_toc_initiative:string;
}
