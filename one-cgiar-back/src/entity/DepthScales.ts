import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import { ProjectionBenefitsDepthScales } from './ProjectionBenefitsDepthScales';

@Entity('depth_scales')
export class DepthScales extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  impactIndicatorId: number;

  @Column({type: 'text'})
  name: string;

  @Column({type: 'tinyint'})
  active: boolean;

  @OneToMany(() => ProjectionBenefitsDepthScales, (projectionBenefitsDepthScales) => projectionBenefitsDepthScales.projectionBenefitsId)
  projectionBenefitsDepthScales: ProjectionBenefitsDepthScales[];
}
