import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn
  } from 'typeorm';
  import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
  import {InitiativesByStages} from './InititativesByStages';
  
  @Entity('init_impact_area_impact_indicators')
  export class InitImpactAreaImpactIndicators extends UpdatedCreatedAt {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type: 'int'})
    impact_indicator_id: number;
  
    @Column({type: 'tinyint'})
    active: boolean;
  
    @Column({type: 'int'})
    initvStgId: number;
  
    @OneToOne(() => InitiativesByStages)
    @JoinColumn()
    initvStg!: InitiativesByStages;
  }
  