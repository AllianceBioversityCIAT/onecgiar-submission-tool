import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { User } from './User';
import { RolesHandler } from "../helpers/RolesHandler";


@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({ message: 'Acronym is required' })
    acronym: string;

    @Column({
        type: "enum",
        enum: RolesHandler,
        default: RolesHandler.sgd
    })
    description: RolesHandler

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => User, user => user.roles)
    users: User[];

}
