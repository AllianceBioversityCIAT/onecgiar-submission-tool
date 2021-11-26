import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('sbt_global_targets')
export class SbtGlobalTargets extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  global_target_id: number;

  @Column({type: 'text'})
  global_target_name: string;

  @Column({type: 'text'})
  global_target_description: string;

  @Column({type: 'int'})
  sbt_impact_area_id: number;

  @Column({type: 'tinyint'})
  active: boolean;
}
