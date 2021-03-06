import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { TOCs } from './TOCs';

@Entity('files')
export class Files extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column('tinyint')
    active: boolean

    @Column({length: '1000'})
    @IsNotEmpty()
    url: string

    @Column({length: '1000'})
    @IsNotEmpty()
    name: string

    @ManyToOne(() => TOCs, tocs => tocs.id)
    public tocs!: TOCs;

}