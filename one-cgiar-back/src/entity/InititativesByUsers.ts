import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {Users} from './Users';
import {Initiatives} from './Initiatives';
import {Roles} from './Roles';

@Entity('initiatives_by_users')
export class InitiativesByUsers extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('tinyint')
  active: boolean;

  @ManyToOne(() => Users, (user) => user.initiatives)
  public user!: Users;

  @ManyToOne(() => Initiatives, (initiative) => initiative.userByStages)
  public initiative!: Initiatives;

  @ManyToOne(() => Roles, (role) => role.id)
  public role!: Roles;
}
