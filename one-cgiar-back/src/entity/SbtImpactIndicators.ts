import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('sbt_impact_indicators')
export class SbtImpactIndicators extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  impact_indicator_id: number;

  @Column({type: 'text'})
  impact_indicator_name: string;

  @Column({type: 'int'})
  sbt_impact_area_id: number;

  @Column({type: 'tinyint'})
  active: boolean;
}
