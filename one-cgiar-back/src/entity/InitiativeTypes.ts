import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('initiative_types')
export class InitiativeTypes {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @Column({
    type: 'text',
    name: 'name',
    nullable: true
  })
  name: string;

  @Column({
    type: 'text',
    name: 'description',
    nullable: true
  })
  description: string;
}
