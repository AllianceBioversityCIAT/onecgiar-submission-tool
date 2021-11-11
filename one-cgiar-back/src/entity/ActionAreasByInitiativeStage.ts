import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { InitiativesByStages } from './InititativesByStages';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('act_ars_by_initv_stg')
export class ActionAreasByInitiativeStage extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'int'})
    action_area_id: number;

    @ManyToOne(() => InitiativesByStages, initvStg => initvStg.id)
    public initvStg!: InitiativesByStages;
    
}