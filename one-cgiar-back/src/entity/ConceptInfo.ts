import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { InitiativesByStages } from './InititativesByStages';


@Entity('concept_info')
export class ConceptInfo extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: '1000' })
    name: string

    @Column({ type: "text" })
    challenge: string

    @Column({ type: "text" })
    objectives: string

    @Column({ type: "text" })
    results: string

    @Column({ type: "text" })
    highlights: string

    @Column({ type: 'int' })
    action_area_id: number;

    @Column({ length: '500' })
    action_area_description: string;

    @OneToOne(() => InitiativesByStages)
    @JoinColumn()
    initvStg!: InitiativesByStages;



}