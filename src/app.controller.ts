import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  // Health Check Endpoint
  @Get('health')
  healthCheck(): string {
    return 'Application is running smoothly!';
  }

  // Endpoint para testar variáveis de ambiente
  @Get('env')
  testEnv(): string {
    const dbHost = this.configService.get<string>('DB_HOST');
    const dbUser = this.configService.get<string>('DB_USER');
    const dbPassword = this.configService.get<string>('DB_PASSWORD');
    const dbName = this.configService.get<string>('DB_NAME');

    if (!dbHost || !dbUser || !dbPassword || !dbName) {
      return 'One or more environment variables are missing!';
    }

    return `
      Database Host: ${dbHost}
      Database User: ${dbUser}
      Database Name: ${dbName}
    `;
  }
}
