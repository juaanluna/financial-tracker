import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseService } from './expense.service';
import { ExpenseRepository } from '../repository/expense.repository';
import { ExpenseEntity } from '../entities/expense.entity';

describe('ExpenseService', () => {
  let service: ExpenseService;

  const mockExpenseRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        { provide: ExpenseRepository, useValue: mockExpenseRepository },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all expenses', async () => {
    const result: ExpenseEntity[] = [
      {
        id: 1,
        description: 'Test expense',
        amount: 100,
        category: 'Food',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    mockExpenseRepository.findAll.mockResolvedValue(result);

    expect(await service.getAll()).toEqual(result);
  });

  it('should get expense by id', async () => {
    const result: ExpenseEntity = {
      id: 1,
      description: 'Test expense',
      amount: 100,
      category: 'Food',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockExpenseRepository.findById.mockResolvedValue(result);

    expect(await service.getById(1)).toEqual(result);
  });

  it('should create a new expense', async () => {
    const newExpense: Omit<ExpenseEntity, 'id' | 'createdAt' | 'updatedAt'> = {
      description: 'Test expense',
      amount: 100,
      category: 'Food',
    };
    const result: ExpenseEntity = {
      ...newExpense,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockExpenseRepository.create.mockResolvedValue(result);

    expect(await service.create(newExpense)).toEqual(result);
  });

  it('should update expense', async () => {
    const existingExpense: ExpenseEntity = {
      id: 1,
      description: 'Test expense',
      amount: 100,
      category: 'Food',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedData: Partial<ExpenseEntity> = { amount: 150 };
    const updatedExpense: ExpenseEntity = {
      ...existingExpense,
      ...updatedData,
      updatedAt: new Date(),
    };

    mockExpenseRepository.findById.mockResolvedValue(existingExpense);
    mockExpenseRepository.update.mockResolvedValue(updatedExpense);

    expect(await service.update(1, updatedData)).toEqual(updatedExpense);
  });

  it('should delete expense by id', async () => {
    const result = { affected: 1 };
    mockExpenseRepository.findById.mockResolvedValue({
      id: 1,
      description: 'Test expense',
      amount: 100,
      category: 'Food',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    mockExpenseRepository.delete.mockResolvedValue(result);

    expect(await service.delete(1)).toEqual(result);
  });
});
