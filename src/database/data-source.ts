import { DataSource } from 'typeorm';
import * as path from 'path';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  migrationsRun: false,
  logging: false,
  entities: [path.join(__dirname, '../modules/**/*.entity{.ts,.js}')], 
  migrations: [path.join(__dirname, './migrations/*{.ts,.js}')], 
});
