import { Entity, PrimaryColumn, Column} from "typeorm";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";

@Entity('clarisa_global_targets')
export class GlobalTargets extends UpdatedCreatedAt {

    @PrimaryColumn()
    id: number;

    @Column()
    impact_area_id: number;

    @Column({ type: "text" })
    impact_area_name: string;
    
    @Column({ type: "text" })
    target: string;
}