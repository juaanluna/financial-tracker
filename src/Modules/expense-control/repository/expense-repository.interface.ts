import { UpdateResult, DeleteResult } from 'typeorm';
import { ExpenseEntity } from '../entities/expense.entity';

export interface ExpenseRepositoryInterface {
  findAll(): Promise<ExpenseEntity[]>;

  findById(id: number): Promise<ExpenseEntity | null>;

  create(
    expense: Omit<ExpenseEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExpenseEntity>;

  update(
    id: number,
    expense: Partial<Omit<ExpenseEntity, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<UpdateResult>;

  delete(id: number): Promise<DeleteResult>;
}
