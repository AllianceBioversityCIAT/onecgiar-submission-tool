import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique, ManyToOne } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { SectionsMeta } from './SectionsMeta';

@Entity('subsections_meta')
export class SubSectionsMeta extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    order: number;

    @Column({ length: '250' })
    description: string;
    
    @Column({ length: '250' })
    display_name: string;
    
    @Column('tinyint')
    active: boolean;

    @Column('tinyint')
    visible: boolean;

    @ManyToOne(() => SectionsMeta, sectionsMeta => sectionsMeta.id)
    sectionsMeta: SectionsMeta;
}