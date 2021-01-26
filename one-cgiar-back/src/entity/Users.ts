import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { IsNotEmpty, IsEmail } from 'class-validator'
import * as bcrypt from 'bcryptjs';
import { UpdatedCreatedAt } from './extends/UpdateCreateAt';
import { Roles } from './Roles';
import { InitiativesByUsers } from './InititativesByUsers';

@Entity()
@Unique(['email'])
export class Users extends UpdatedCreatedAt {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    first_name: string

    @Column()
    @IsNotEmpty()
    last_name: string

    @Column()
    @IsNotEmpty({ message: 'The email is required' })
    @IsEmail({}, { message: 'Incorrect email' })
    email: string;

    @Column({ nullable: true })
    password: string

    @Column({ default: false })
    is_cgiar: boolean;

    @ManyToMany(type => Roles)
    @JoinTable({
        name: "roles_by_users", // table name for the junction table of this relation
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "role_id",
            referencedColumnName: "id"
        }
    })
    roles: Roles[];

    @OneToMany(() => InitiativesByUsers, initiativeByUsers => initiativeByUsers.user)
    public initiatives!: InitiativesByUsers[];

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }

    checkPassword(password: string): boolean {
        try {
            return bcrypt.compareSync(password, this.password);
        } catch (error) {
            console.log(error)
            return false;
        }
    }

}