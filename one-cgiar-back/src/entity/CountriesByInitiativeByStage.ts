import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { InitiativesByStages } from './InititativesByStages';
import { WorkPackages } from './WorkPackages';

@Entity('countries_by_initiative_by_stage')
export class CountriesByInitiativeByStage extends UpdatedCreatedAt {
    @PrimaryGeneratedColumn()
    id: number

    @Column('tinyint')
    active: boolean

    @OneToOne(() => WorkPackages)
    @JoinColumn()
    wrkPkg!: WorkPackages;
    
    @OneToOne(() => InitiativesByStages)
    @JoinColumn()
    initvStg!: InitiativesByStages;

    @Column({type: 'int'})
    country_id: number;
}