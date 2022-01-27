import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('clarisa_global_targets')
export class ClarisaGlobalTargets extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  impact_area_id: number;

  @Column({type: 'text'})
  impact_area_name: string;

  @Column({type: 'text'})
  target: string;
}
