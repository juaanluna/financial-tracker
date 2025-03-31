import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExpenseRepository } from './repository/expense.repository';
import { ExpenseController } from './controllers/expense.controller';
import { ExpenseEntity } from './entities/expense.entity';
import { ExpenseService } from './services/expense.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseEntity])],
  controllers: [ExpenseController],
  providers: [ExpenseService, ExpenseRepository],
})
export class ExpenseModule {}
