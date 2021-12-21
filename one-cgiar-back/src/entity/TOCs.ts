import {IsNotEmpty} from 'class-validator';
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {InitiativesByStages} from './InititativesByStages';

@Entity('tocs')
export class TOCs extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: '1000'})
  @IsNotEmpty()
  narrative: string;

  @Column({type: 'text'})
  diagram:String;

  @Column({type: 'tinyint'})
  type:boolean

  @Column({type: 'tinyint'})
  active:boolean

  @Column({type: 'text'})
  tocId: string;

  @Column({type: 'int'})
  initvStgId: number;

  @ManyToOne(() => InitiativesByStages, (initvStg) => initvStg.id)
  public initvStg!: InitiativesByStages;
}
