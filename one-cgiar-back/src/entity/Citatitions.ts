import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";
import { InitiativesByStages } from "./InititativesByStages";

@Entity('citations')
export class Citations extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text" })
    title: string

    @Column({ type: "text" })
    link: string

    @Column({ type: "text" })
    table_name: string
    
    @Column({ type: "text" })
    col_name: string

    @OneToOne(() => InitiativesByStages)
    @JoinColumn()
    initvStg!: InitiativesByStages;
}