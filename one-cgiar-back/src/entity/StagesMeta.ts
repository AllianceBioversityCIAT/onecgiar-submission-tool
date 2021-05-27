import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique, ManyToOne } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { Stages } from './Stages';

@Entity('stages_meta')
export class StagesMeta extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: '500' })
    stage_name: string

    @Column({ length: '250' })
    col_name: string
    
    @Column({ length: '250' })
    table_name: string

    @Column({ length: '250' })
    display_name: string
    
    @Column({ length: '250' })
    group_by: string

    @Column('tinyint')
    active: boolean

    @Column('tinyint')
    visible: boolean

    @Column('int')
    order: number

    @ManyToOne(() => Stages, stage => stage.id)
    stage: Stages;
}