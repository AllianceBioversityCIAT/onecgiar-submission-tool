import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, Unique } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { User } from './Users';
import { RolesHandler } from "../helpers/RolesHandler";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";
import { Permissions } from "./Permissions";


@Entity()
@Unique(['acronym', 'name'])
export class Roles extends UpdatedCreatedAt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @Column()
    @IsNotEmpty({ message: 'Acronym is required' })
    acronym: string;

    @Column()
    @IsNotEmpty({ message: 'Acronym is required' })
    description: string

   

}
