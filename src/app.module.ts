import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ExpenseModule } from './Modules/expense-control/expense-control.module';

@Module({
  // Imports são modulos internos ou externos que a aplicação vai usar
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
    }),
    DatabaseModule,
    ExpenseModule,
  ],
  controllers: [AppController], // Define quais controladores a aplicação vai utilizar. Recebe e retorna as respostas das API
  providers: [AppService], // Responsáveis pela lógica de negócios da aplicação. Podem ser serviços, repositórios, ou qualquer outra classe que forneça alguma funcionalidade.
})
export class AppModule {}
