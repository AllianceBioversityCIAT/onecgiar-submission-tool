import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique
} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByStages} from './InititativesByStages';

@Entity()
@Unique(['description'])
export class Stages extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: '500'})
  @IsNotEmpty()
  description: string;

  @Column('tinyint')
  active: boolean;

  @Column({type: 'timestamp', nullable: true})
  start_date: Date;

  @Column({type: 'timestamp', nullable: true})
  end_date: Date;

  @OneToMany(
    () => InitiativesByStages,
    (initiativeByStages) => initiativeByStages.stage
  )
  public initiatives!: InitiativesByStages[];
}
