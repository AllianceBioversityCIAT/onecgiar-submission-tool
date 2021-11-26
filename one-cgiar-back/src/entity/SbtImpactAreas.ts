import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('sbt_impact_areas')
export class SbtImpactAreas extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  impact_area_id: number;

  @Column({type: 'text'})
  impact_area_name: string;

  @Column({type: 'int'})
  result_framework_id: number;

  @Column({type: 'tinyint'})
  active: boolean;
}
