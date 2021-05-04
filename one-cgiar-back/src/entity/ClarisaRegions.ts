import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { UpdatedCreatedAt } from "./extends/UpdateCreateAt"


@Entity('clarisa_regions')
export class ClarisaRegions extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'int' })
    code: number

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text' })
    parentRegionName: string
    
    @Column({ type: 'int' })
    parentRegionCode: number
    
    @Column({ type: 'json' })
    data: JSON


}