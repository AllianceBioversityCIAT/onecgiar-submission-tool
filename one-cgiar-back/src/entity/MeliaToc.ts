import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column
  } from 'typeorm';
  import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import { MeliaStudiesActivities } from './MeliaStudiesActivities';
import { Results } from './Results';
import { InitiativesByStages } from './InititativesByStages';
  @Entity('melia_toc')
  export class MeliaToc {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MeliaStudiesActivities, (melia) => melia.id)
    meliaId: number;

    @ManyToOne(() => Results, (results) => results.id)
    outcomeId: number;

    @ManyToOne(() => InitiativesByStages, (init) => init.id)
    initvStgId: number;

    @Column('tinyint')
    active: number;
    
  }
  