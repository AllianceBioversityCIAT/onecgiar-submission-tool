import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('clarisa_sdg_targets')
export class ClarisaSdgTargets extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  sdg_target_code: string;

  @Column({type: 'text'})
  sdg_target: string;

  @Column({type: 'json'})
  sdg: JSON;
}
