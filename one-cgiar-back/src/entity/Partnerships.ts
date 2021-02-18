import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { InitiativesByStages } from './InititativesByStages';

@Entity('partnerships')
export class Partnerships extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column({length: '1000'})
    @IsNotEmpty()
    comparative_advantage: string

    @ManyToOne(() => InitiativesByStages, initvStg => initvStg.id)
    public initvStg!: InitiativesByStages;
    
}