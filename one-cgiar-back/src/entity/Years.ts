import {IsNotEmpty} from 'class-validator';
import {Column, Entity, PrimaryColumn} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';

@Entity('years')
export class Years extends UpdatedCreatedAt {
  @PrimaryColumn({length: '4'})
  @IsNotEmpty()
  year: string;
}
