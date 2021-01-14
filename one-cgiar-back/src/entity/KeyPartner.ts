import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { InitiativesByStages } from './InititativesByStages';

@Entity('key_partners')
export class KeyPartners extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'int'})
    key_partner_id: number;

    @Column({length: '1000'})
    @IsNotEmpty()
    toc_description: string
    
    @Column({length: '1000'})
    @IsNotEmpty()
    comparative_advantage: string

    @ManyToOne(() => InitiativesByStages, initvStg => initvStg.id)
    public initvStg!: InitiativesByStages;
    
}