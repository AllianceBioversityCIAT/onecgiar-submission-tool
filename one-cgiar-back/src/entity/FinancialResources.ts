import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";
import { InitiativesByStages } from "./InititativesByStages";

@Entity('financial_resources')
export class FinancialResources extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    initvStgId: number;

    @Column({ type: "text" })
    detailed_budget: string;

    @Column({ type: "tinyint" })
    active: boolean;

    @OneToOne(() => InitiativesByStages)
    @JoinColumn()
    initvStg!: InitiativesByStages;
}