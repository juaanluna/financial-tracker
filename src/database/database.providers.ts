import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrationsRun: true, // Rodar as migrações automaticamente
  migrations: [path.join(__dirname, '/../migrations/*{.ts,.js}')], // Caminho das migrações
});
