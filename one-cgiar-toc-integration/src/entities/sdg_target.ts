import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('clarisa_sdg_targets')
export class SdgTarget{
  @PrimaryGeneratedColumn()
  id: number;

}