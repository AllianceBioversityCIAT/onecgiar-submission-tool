import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";
import { InitiativesByStages } from "./InititativesByStages";

@Entity('impact_strategies')
export class ImpactStrategies extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"int"})
    initvStgId: number

    @Column('tinyint')
    active: boolean

    @Column({ type: "text" })
    challenge_priorization: string

    @Column({ type: "text" })
    research_questions: string

    @Column({ type: "text" })
    component_work_package: string

    @Column({ type: "text" })
    performance_results: string

    @Column({ type: "text" })
    human_capacity: string

}