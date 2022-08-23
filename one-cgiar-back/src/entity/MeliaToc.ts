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
    meliaId: MeliaStudiesActivities;

    @ManyToOne(() => Results, (results) => results.id)
    outcomeId: Results;

    @ManyToOne(() => InitiativesByStages, (init) => init.id)
    initvStgId: InitiativesByStages;

    @Column('tinyint')
    active: number;
    
  }
  