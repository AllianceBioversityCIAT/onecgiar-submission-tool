import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { Initiatives } from './Initiatives';
import { Stages } from './Stages';

@Entity('initiatives_by_stages')
export class InitiativesByStages extends UpdatedCreatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Stages, stage => stage.initiatives)
    public stage!: Stages;

    @ManyToOne(() => Initiatives, initiative => initiative.stages)
    public initiative!: Initiatives;

}

