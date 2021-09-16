import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";

@Entity('dimensions')
export class Dimensions extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    projectionId: number;

    @Column({type: 'int'})
    depthDescriptionId: number;

    @Column({ type: "double" })
    breadth_value: number;

    @Column({ type: "tinyint" })
    active: boolean;

}