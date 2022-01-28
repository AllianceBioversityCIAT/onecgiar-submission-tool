import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne
} from 'typeorm';
import {UpdatedCreatedAt} from './extends/UpdateCreateAt';
import {Submissions} from './Submissions';

@Entity('submissions_status')
export class SubmissionsStatus extends UpdatedCreatedAt {
    @PrimaryGeneratedColumn()
    id: number;
        
    @Column('int')
    statusId: number;
    
    @Column('text')
    description: string;
    
    @Column('int')
    userId: number;
    
    @Column('text')
    first_name: string;
    
    @Column('text')
    last_name: string;

    @Column('tinyint')
    active: boolean;

    @OneToOne(() => Submissions)
    @JoinColumn()
    submission!: Submissions;

}
