import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Health Check
  @Get('health')
  healthCheck(): string {
    return 'Application is running!';
  }

  // Endpoint para testar variáveis de ambiente
  @Get('env')
  testEnv(): string {
    return this.appService.getDatabaseInfo();
  }
}
