import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique, ManyToOne } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { Stages } from './Stages';

@Entity('stages_meta')
export class StagesMeta extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: '500' })
    @IsNotEmpty()
    stage_name: string

    @Column({ length: '250' })
    @IsNotEmpty()
    col_name: string

    @Column({ length: '250' })
    @IsNotEmpty()
    display_name: string
    
    @Column({ length: '250' })
    @IsNotEmpty()
    group_by: string

    @Column('tinyint')
    active: boolean

    @Column('tinyint')
    visible: boolean

    @ManyToOne(() => Stages, stage => stage.id)
    stage: Stages;
}