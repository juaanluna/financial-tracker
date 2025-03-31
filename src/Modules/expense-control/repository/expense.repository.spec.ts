import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseRepository } from './expense.repository';
import { ExpenseEntity } from '../entities/expense.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';

describe('ExpenseRepository', () => {
  let repository: ExpenseRepository;
  let mockRepository: Repository<ExpenseEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseRepository,
        {
          provide: getRepositoryToken(ExpenseEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<ExpenseRepository>(ExpenseRepository);
    mockRepository = module.get<Repository<ExpenseEntity>>(
      getRepositoryToken(ExpenseEntity),
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should find all expenses', async () => {
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
    jest.spyOn(mockRepository, 'find').mockResolvedValue(result);

    expect(await repository.findAll()).toEqual(result);
  });

  it('should return expense by id', async () => {
    const result: ExpenseEntity = {
      id: 1,
      description: 'Test expense',
      amount: 100,
      category: 'Food',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(mockRepository, 'findOne').mockResolvedValue(result);

    expect(await repository.findById(1)).toEqual(result);
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
    jest.spyOn(mockRepository, 'create').mockReturnValue(result);
    jest.spyOn(mockRepository, 'save').mockResolvedValue(result);

    expect(await repository.create(newExpense)).toEqual(result);
  });

  it('should update an existing expense', async () => {
    const updatedData: Partial<ExpenseEntity> = { amount: 150 };
    const result: UpdateResult = { generatedMaps: [], raw: [], affected: 1 };
    jest.spyOn(mockRepository, 'update').mockResolvedValue(result);

    expect(await repository.update(1, updatedData)).toEqual(result);
  });

  it('should delete an expense by id', async () => {
    const result: DeleteResult = { raw: [], affected: 1 };
    jest.spyOn(mockRepository, 'delete').mockResolvedValue(result);

    expect(await repository.delete(1)).toEqual(result);
  });
});
