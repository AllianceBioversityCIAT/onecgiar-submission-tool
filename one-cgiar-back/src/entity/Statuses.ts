import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('statuses')
export class Statuses extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  status: string;

  @Column('text')
  icon: string;

  @Column('text')
  description: string;

  @Column('json')
  rolesAvailables: any;

  @Column('json')
  stagesAvailables: any;

  @Column('tinyint')
  active: boolean;
}
