import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { MinLength, IsNotEmpty, IsEmail } from 'class-validator'
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username', 'email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    firstname: string

    @Column()
    @IsNotEmpty()
    lastname: string

    @Column()
    @MinLength(4)
    @IsNotEmpty({ message: 'The username is required' })
    username: string

    @Column()
    @IsNotEmpty({ message: 'The email is required' })
    @IsEmail({}, { message: 'Incorrect email' })
    email: string;

    @Column({ nullable: true })
    password: string

    @Column({ default: 'SGD' })
    role: string

    @Column({ default: false })
    is_cgiar: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    hashPassword():void {
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }

    checkPassword(password: string):boolean {
        try {
            return bcrypt.compareSync(password, this.password);
        } catch (error) {
            console.log(error)
            return false;
        }
    }

}