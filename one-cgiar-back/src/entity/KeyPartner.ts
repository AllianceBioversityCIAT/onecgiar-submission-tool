import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { Partnerships } from './Partnerships';
@Entity('key_partners')
export class KeyPartners extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column('tinyint')
    active: boolean

    @Column({ type: 'int' })
    @IsNotEmpty()
    key_partner_id: number;

    @Column({ length: '1000' })
    key_partner_name: string

    @Column({ type: "text" })
    description: string

    @ManyToOne(() => Partnerships, partnerships => partnerships.id)
    public partnerships!: Partnerships;

}