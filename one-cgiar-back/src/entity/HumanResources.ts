import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";
import { InitiativesByStages } from "./InititativesByStages";

@Entity('human_resources')
export class HumanResources extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    initvStgId: number;

    @Column({ type: "text" })
    gender_diversity_inclusion: string;

    @Column({ type: "text" })
    capacity_development: string;

    @Column({ type: "tinyint" })
    active: boolean;

    @OneToOne(() => InitiativesByStages)
    @JoinColumn()
    initvStg!: InitiativesByStages;
}