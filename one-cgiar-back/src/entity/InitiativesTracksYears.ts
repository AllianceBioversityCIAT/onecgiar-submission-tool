import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByStages} from './InititativesByStages';
import {MeliaStudiesActivities} from './MeliaStudiesActivities';
import {Tracks} from './Tracks';
import {TracksYears} from './TracksYears';

@Entity('initiatives_tracks_years')
export class InitiativesTracksYears extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  track_id: number;

  @ManyToOne(() => Tracks)
  @JoinColumn({name: 'track_id'})
  track!: Tracks;

  @Column({type: 'int'})
  track_year_id: number;

  @ManyToOne(() => TracksYears)
  @JoinColumn({name: 'track_year_id'})
  trackYear!: TracksYears;

  @Column({type: 'int'})
  initvStgId: number;

  @ManyToOne(() => InitiativesByStages)
  @JoinColumn({name: 'initvStgId'})
  initvStg!: InitiativesByStages;

  @Column({type: 'int', default: 0})
  value: number;

  @Column({type: 'tinyint', default: true})
  active: boolean;
}
