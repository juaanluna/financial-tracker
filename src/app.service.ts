import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getDatabaseInfo(): string {
    const dbHost = this.configService.get<string>('DB_HOST');
    const dbUser = this.configService.get<string>('DB_USER');
    const dbPassword = this.configService.get<string>('DB_PASSWORD');
    const dbName = this.configService.get<string>('DB_NAME');

    if (!dbHost || !dbUser || !dbPassword || !dbName) {
      return 'One or more environment variables are missing!';
    }

    return `Database Host: ${dbHost}\nDatabase User: ${dbUser}\nDatabase Name: ${dbName}`;
  }
}
