import {Column, CreateDateColumn} from "typeorm";

export abstract  class UpdatedCreatedAt {

    @Column()
    @CreateDateColumn()
    created_at: Date

    @Column()
    @CreateDateColumn()
    updated_at: Date

}