import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";

@Entity('depth_scales')
export class DepthScales extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "tinyint" })
    active: boolean;
}