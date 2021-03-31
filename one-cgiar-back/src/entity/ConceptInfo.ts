import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { InitiativesByStages } from './InititativesByStages';


@Entity('concept_info')
export class ConceptInfo extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: '1000' })
    @IsNotEmpty()
    name: string

    @Column({ type: "text" })
    @IsNotEmpty()
    challenge: string

    @Column({ type: "text" })
    @IsNotEmpty()
    objectives: string

    @Column({ type: "text" })
    @IsNotEmpty()
    results: string

    @Column({ type: "text" })
    @IsNotEmpty()
    highlights: string

    @Column({ type: 'int' })
    action_area_id: number;

    @Column({ length: '500' })
    @IsNotEmpty()
    action_area_description: string;

    @OneToOne(() => InitiativesByStages)
    @JoinColumn()
    initvStg!: InitiativesByStages;



}