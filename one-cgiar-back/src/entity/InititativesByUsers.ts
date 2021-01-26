import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { Users } from './Users';
import { Initiatives } from './Initiatives';

@Entity('initiatives_by_users')
export class InitiativesByUsers extends UpdatedCreatedAt {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Users, user => user.initiatives)
    public user!: Users;

    @ManyToOne(() => Initiatives, initiative => initiative.users)
    public initiative!: Initiatives;

    @Column('tinyint')
    is_lead: boolean

    @Column('tinyint')
    is_owner: boolean

    @Column('tinyint')
    is_coordinator: boolean
}
