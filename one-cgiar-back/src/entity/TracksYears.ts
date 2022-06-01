import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";

@Entity('tracks_years')
@Unique(['year'])
export class TracksYears extends UpdatedCreatedAt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: '4'})
    year: string;

    @Column()
    name: string;

    @Column()
    cycle: string;
}