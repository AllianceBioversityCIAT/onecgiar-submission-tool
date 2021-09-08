import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";

@Entity('projected_probabilities')
export class projectedProbabilities extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "tinyint" })
    active: boolean;
}