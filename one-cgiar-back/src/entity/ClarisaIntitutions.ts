import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt"


@Entity('clarisa_institutions')
export class ClarisaInstitutions extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'int' })
    code: number

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text' })
    acronym: string

    @Column({ type: 'text' })
    country_name: string

    @Column({ type: 'json' })
    data: JSON

    @Column({ type: 'int' })
    institutionTypeId: number

    @Column({ type: 'text' })
    institutionType: string

}