import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt"


@Entity('clarisa_impact_areas')
export class ClarisaImpactAreas extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text' })
    description: string

}