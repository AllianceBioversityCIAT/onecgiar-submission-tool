import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";

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
