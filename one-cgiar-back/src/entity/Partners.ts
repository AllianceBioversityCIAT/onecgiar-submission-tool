import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";

@Entity('partners')
export class Partners extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    impact_strategies_id: number;

    @Column({type: 'int'})
    institutions_id: number;

    @Column({ type: "text" })
    institutions_name: string;

    @Column({type: 'int'})
    tag_id: number;

    @Column({type: 'int'})
    type_id: number;

    @Column({ type: "text" })
    type_name: string;

    @Column({ type: "tinyint" })
    active: boolean;

    @Column({ type: "tinyint" })
    demand: boolean;

    @Column({ type: "tinyint" })
    innovation: boolean;

    @Column({ type: "tinyint" })
    scaling: boolean;

}