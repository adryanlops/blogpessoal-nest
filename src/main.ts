import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // criando a aplicação NestJS
  const app = await NestFactory.create(AppModule);

  //ajuste de fuso horario
  process.env.TZ = '-03:00';

  // habilitando o uso do ValidationPipe globalmente
  app.useGlobalPipes(new  ValidationPipe());

  // habilitando o CORS
  app.enableCors();

  // iniciando a aplicação na porta 4000 ou na porta definida nas variáveis de ambiente
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
