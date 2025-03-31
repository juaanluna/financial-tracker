import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ExpenseRepository } from '../repository/expense.repository';
import { ExpenseEntity } from '../entities/expense.entity';

@Injectable()
export class ExpenseService {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async getAll(): Promise<ExpenseEntity[]> {
    try {
      return await this.expenseRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching all expenses');
    }
  }

  async getById(id: number): Promise<ExpenseEntity> {
    try {
      const expense = await this.expenseRepository.findById(id);
      if (!expense) {
        throw new NotFoundException(`Expense with id ${id} not found`);
      }
      return expense;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching expense by id');
    }
  }

  async create(
    expense: Omit<ExpenseEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExpenseEntity> {
    try {
      return await this.expenseRepository.create(expense);
    } catch (error) {
      throw new InternalServerErrorException('Error creating expense');
    }
  }

  async update(
    id: number,
    expense: Partial<Omit<ExpenseEntity, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<UpdateResult> {
    try {
      const existingExpense = await this.expenseRepository.findById(id);
      if (!existingExpense) {
        throw new NotFoundException(`Expense with id ${id} not found`);
      }
      return await this.expenseRepository.update(id, expense);
    } catch (error) {
      throw new InternalServerErrorException('Error updating expense');
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    try {
      const expense = await this.expenseRepository.findById(id);
      if (!expense) {
        throw new NotFoundException(`Expense with id ${id} not found`);
      }
      return await this.expenseRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Error deleting expense');
    }
  }
}
