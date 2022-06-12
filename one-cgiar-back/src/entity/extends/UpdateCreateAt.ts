import {Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

export abstract class UpdatedCreatedAt {
  @Column()
  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  created_at: Date;

  @Column()
  @CreateDateColumn({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true
  })
  @UpdateDateColumn({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true
  })
  updated_at: Date;
}
