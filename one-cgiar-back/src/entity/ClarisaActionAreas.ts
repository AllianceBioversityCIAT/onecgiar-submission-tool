import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt"


@Entity('clarisa_action_areas')
export class ClarisaActionAreas extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text' })
    description: string

}