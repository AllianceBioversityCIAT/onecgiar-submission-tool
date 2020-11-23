import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

@Entity()
export class Initiative {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty({ message: 'The initiative name is required' })
    name: string

    // @Column()
    // @IsNotEmpty({ message: 'The lead contact person is required' })
    // lead_name: string

    @Column()
    @IsNotEmpty({ message: 'The primary CGIAR action area is required' })
    action_area: string

    @Column()
    @IsNotEmpty({ message: 'The email is required' })
    global_budget: number;

    @Column()
    @IsNotEmpty({ message: 'The challenge is required' })
    challenge: string

    @Column()
    @IsNotEmpty({ message: 'The objetives are required' })
    objetives: string

    @Column()
    @IsNotEmpty({ message: 'The results are required' })
    results: string;

    @Column()
    @IsNotEmpty({ message: 'The activities are required' })
    activities: string;

    @Column()
    @IsNotEmpty({ message: 'The highlights are required' })
    highlights: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

}