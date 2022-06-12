import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('dimensions')
export class Dimensions extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  projectionId: number;

  @Column({type: 'int'})
  depthDescriptionId: number;

  @Column({type: 'text'})
  breadth_value: string;

  @Column({type: 'tinyint'})
  active: boolean;

  @Column({length: '500'})
  depth_description: string;
}
