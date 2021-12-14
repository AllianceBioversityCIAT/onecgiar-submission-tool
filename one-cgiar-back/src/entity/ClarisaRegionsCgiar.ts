import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('clarisa_regions_cgiar')
export class ClarisaRegionsCgiar extends UpdatedCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  name: string;

  @Column({type: 'text'})
  acronym: string;

  @Column({type: 'json'})
  countries: JSON;

}
