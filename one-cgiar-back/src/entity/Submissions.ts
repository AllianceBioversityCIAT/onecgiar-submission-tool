import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { InitiativesByStages } from './InititativesByStages';

@Entity('submissions')
export class Submissions extends UpdatedCreatedAt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('tinyint')
    active: boolean;

    @Column('tinyint')
    complete: boolean;

    @Column({type: 'text'})
    missing: string;

    @OneToOne(() => InitiativesByStages)
    @JoinColumn()
    initvStg!: InitiativesByStages;

}