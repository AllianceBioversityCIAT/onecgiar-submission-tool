import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";

@Entity('opportunities')
export class Opportunities extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    opportunities_description: string;

    @Column({ type: 'int' })
    risk_assessment_id: number;

    @Column({ type: "tinyint" })
    active: boolean;

}