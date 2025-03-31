import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('expenses')
  export class ExpenseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    description: string;
  
    @Column('decimal')
    amount: number;
  
    @Column()
    category: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  