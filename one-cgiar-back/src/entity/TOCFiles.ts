import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { InitiativesByStages } from './InititativesByStages';

@Entity('toc_files')
export class TOCFiles extends UpdatedCreatedAt {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: '1000'})
    @IsNotEmpty()
    url: string

    @Column({length: '1000'})
    @IsNotEmpty()
    narrative: string

    @ManyToOne(() => InitiativesByStages, initvStg => initvStg.id)
    public initvStg!: InitiativesByStages;
}