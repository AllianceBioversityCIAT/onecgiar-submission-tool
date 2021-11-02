import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt";

@Entity('sbt_sdg_targets')
export class SbtSdgTargets extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    sdg_target_id: number;

    @Column({ type: "text" })
    sdg_target_code: string;

    @Column({ type: "text" })
    sdg_target_target: string;

    @Column({type: 'int'})
    sbt_impact_area_id: number;

    @Column({ type: "tinyint" })
    active: boolean;

}