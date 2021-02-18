import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { InitiativesByStages } from './InititativesByStages';
import { Partnerships } from './Partnerships';

@Entity('key_partners')
export class KeyPartners extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column('tinyint')
    active: boolean

    @Column({ type: 'int' })
    key_partner_id: number;

    @Column({ length: '1000' })
    @IsNotEmpty()
    key_partner_name: string

    @Column({ length: '1000' })
    @IsNotEmpty()
    description: string

    @Column({ length: '1000' })
    @IsNotEmpty()
    comparative_advantage: string

    @ManyToOne(() => Partnerships, partnerships => partnerships.id)
    public partnerships!: Partnerships;

}