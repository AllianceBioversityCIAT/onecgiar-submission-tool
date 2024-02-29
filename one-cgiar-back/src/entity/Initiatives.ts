import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByUsers} from './InititativesByUsers';
import {InitiativesByStages} from './InititativesByStages';
import {InitiativeTypes} from './InitiativeTypes';

@Entity('initiatives')
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

  @Column({type: 'int', nullable: true, name: 'type'})
  type!: number;

  @ManyToOne(() => InitiativeTypes, (initiativeType) => initiativeType.id)
  @JoinColumn({name: 'type'})
  type_obj!: InitiativeTypes;

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
