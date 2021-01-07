import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { User } from './Users';
import { RolesHandler } from "../helpers/RolesHandler";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";
import { Roles } from "./Roles";


@Entity()
export class Permissions extends UpdatedCreatedAt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({ message: 'Resource is required' })
    resource: string;

    @Column()
    @IsNotEmpty({ message: 'Action is required' })
    action: string;

    @Column()
    @IsNotEmpty({ message: 'Attributes is required' })
    attributes: string;

    @Column()
    name: string;

    @ManyToMany(type => Roles)
    @JoinTable({
        name: "permissions_by_roles", // table name for the junction table of this relation
        joinColumn: {
            name: "permission_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "role_id",
            referencedColumnName: "id"
        }
    })
    roles: Roles[];

}