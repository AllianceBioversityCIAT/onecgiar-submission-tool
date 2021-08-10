import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { Stages } from './Stages';

@Entity('sections_meta')
export class SectionsMeta extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: '500' })
    description: string;

    @Column({ length: '250' })
    display_name: string;
   
    @Column({ length: '500' })
    stage_name: string;

    @Column('tinyint')
    active: boolean;

    @Column('tinyint')
    visible: boolean;

    @ManyToOne(() => Stages, stage => stage.id)
    stage: Stages;

}