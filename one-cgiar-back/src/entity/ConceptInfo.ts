import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { InitiativesByStages } from './InititativesByStages';


@Entity('concept_info')
export class ConceptInfo extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: '1000'})
    @IsNotEmpty()
    name: string

    @Column({length: '1000'})
    @IsNotEmpty()
    challenge: string
    
    @Column({length: '1000'})
    @IsNotEmpty()
    objectives: string
    
    @Column({length: '1000'})
    @IsNotEmpty()
    results: string
    
    @Column({length: '1000'})
    @IsNotEmpty()
    highlights: string

    @Column({type: 'int'})
    action_area_id: number;

    @Column({length: '500'})
    @IsNotEmpty()
    action_area_description: string;

    @OneToOne(() => InitiativesByStages)
    @JoinColumn()
    initvStg!: InitiativesByStages;



}