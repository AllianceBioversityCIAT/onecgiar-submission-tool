import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt"


@Entity('clarisa_institutions_types')
export class ClarisaInstitutionsTypes extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string

}