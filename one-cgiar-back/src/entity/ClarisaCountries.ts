import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt"


@Entity('clarisa_countries')
export class ClarisaCountries extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'int' })
    code: number

    @Column({ type: 'text' })
    isoAlpha2: string

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'json' })
    regionDTO: JSON


}