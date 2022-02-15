import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByUsers} from './InititativesByUsers';
import {InitiativesByStages} from './InititativesByStages';

@Entity()
export class Initiatives extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  @IsNotEmpty()
  name: string;

  @Column({type: 'text'})
  acronym: string;

  @Column()
  @IsNotEmpty()
  official_code: string;

  @OneToMany(
    () => InitiativesByUsers,
    (initiativeByUsers) => initiativeByUsers.user
  )
  public userByStages!: InitiativesByUsers[];

  @OneToMany(
    () => InitiativesByStages,
    (initiativeByStages) => initiativeByStages.initiative
  )
  public initvByStages!: InitiativesByStages[];
}
