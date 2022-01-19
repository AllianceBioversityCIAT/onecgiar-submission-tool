import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn
  } from 'typeorm';
  import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
  import {InitiativesByStages} from './InititativesByStages';
  
  @Entity('init_action_areas_out_indicators')
  export class InitActionAreasOutcomesIndicators extends UpdatedCreatedAt {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type: 'int'})
    outcomes_indicators_id: number;
  
    @Column({type: 'tinyint'})
    active: boolean;
  
    @Column({type: 'int'})
    initvStgId: number;
  
    @OneToOne(() => InitiativesByStages)
    @JoinColumn()
    initvStg!: InitiativesByStages;
  }
  