import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";
import { InitiativesByStages } from "./InititativesByStages";

@Entity('policy_compliance_oversight')
export class PolicyComplianceOrversight extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    initvStgId: number;

    @Column({ type: "tinyint" })
    research_governance_policy: boolean;

    @Column({ type: "tinyint" })
    open_fair_data_policy: boolean;

    @Column({ type: "text" })
    open_fair_data_details: string;

    @Column({ type: "tinyint" })
    active: boolean;

    @OneToOne(() => InitiativesByStages)
    @JoinColumn()
    initvStg!: InitiativesByStages;
}