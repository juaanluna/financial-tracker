import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ExpenseRepositoryInterface } from './expense-repository.interface';
import { ExpenseEntity } from '../entities/expense.entity';


@Injectable()
export class ExpenseRepository implements ExpenseRepositoryInterface {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly repository: Repository<ExpenseEntity>,
  ) {}

  async findAll(): Promise<ExpenseEntity[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<ExpenseEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(
    expense: Omit<ExpenseEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExpenseEntity> {
    const newExpense = this.repository.create(expense);
    return this.repository.save(newExpense);
  }

  async update(
    id: number,
    expense: Partial<Omit<ExpenseEntity, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<UpdateResult> {
    return this.repository.update(id, expense);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
