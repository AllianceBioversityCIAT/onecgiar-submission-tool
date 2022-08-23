import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column
  } from 'typeorm';
  import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import { MeliaStudiesActivities } from './MeliaStudiesActivities';
import { Results } from './Results';
  @Entity('melia_toc')
  export class MeliaToc {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MeliaStudiesActivities, (melia) => melia.id)
    meliaId: MeliaStudiesActivities;

    @ManyToOne(() => Results, (results) => results.id)
    outcomeId: Results;

    @Column('tinyint')
    active: number;
    
  }
  