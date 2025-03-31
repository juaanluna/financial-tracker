import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ExpenseService } from '../services/expense.service';
import { AppControllers } from 'src/Shared/enums/app-controllers';
import { ExpenseEntity } from '../entities/expense.entity';

@Controller(AppControllers.expenses)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  async getAll(): Promise<ExpenseEntity[]> {
    return this.expenseService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<ExpenseEntity> {
    return this.expenseService.getById(id);
  }

  @Post()
  async create(
    @Body() expense: Omit<ExpenseEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExpenseEntity> {
    return this.expenseService.create(expense);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body()
    expense: Partial<Omit<ExpenseEntity, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<UpdateResult> {
    return this.expenseService.update(id, expense);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.expenseService.delete(id);
  }
}
