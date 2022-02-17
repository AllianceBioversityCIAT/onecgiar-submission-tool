import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByStages} from './InititativesByStages';

@Entity('highlights')
export class Highlights extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  initvStgId: number;

  @Column({type: 'text'})
  name: string;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'tinyint'})
  active: boolean;

  @OneToOne(() => InitiativesByStages)
  @JoinColumn()
  initvStg!: InitiativesByStages;
}
