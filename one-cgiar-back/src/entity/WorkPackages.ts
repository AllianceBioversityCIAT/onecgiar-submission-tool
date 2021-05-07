import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { InitiativesByStages } from './InititativesByStages';

@Entity('work_packages')
export class WorkPackages extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column('tinyint')
    active: boolean

    @Column({length: '500'})
    name: string
    
    @Column({length: '500'})
    acronym: string

    @Column({length: '1000'})
    results: string
    
    @Column({length: '1000'})
    pathway_content: string

    @Column('tinyint')
    is_global: boolean

    @OneToOne(() => InitiativesByStages)
    @JoinColumn()
    initvStg!: InitiativesByStages;


}