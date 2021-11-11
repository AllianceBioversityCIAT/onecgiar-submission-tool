import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { InitiativesByStages } from './InititativesByStages';


@Entity('general_information')
export class GeneralInformation extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: '1000' })
    name: string

    @Column({ type: 'int' })
    action_area_id: number;

    @Column({ length: '500' })
    action_area_description: string;

    @OneToOne(() => InitiativesByStages)
    @JoinColumn()
    initvStg!: InitiativesByStages;
}