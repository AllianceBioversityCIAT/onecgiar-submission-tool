import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";
import { InitiativesByStages } from "./InititativesByStages";

@Entity('financial_resources')
export class FinancialResources extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'decimal'})
    value: number;

    @Column({ type: "text" })
    financial_type: string;

    @Column({type: 'int'})
    financial_type_id: number;

    @Column({ type: "tinyint" })
    active: boolean;
    
    @Column({ type: "datetime" })
    year: Date;

    @Column({ type: "text" })
    col_name: string;
    
    @Column({ type: "text" })
    table_name: string;

    @OneToOne(() => InitiativesByStages)
    @JoinColumn()
    initvStg!: InitiativesByStages;
}