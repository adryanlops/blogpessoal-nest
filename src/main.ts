import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // criando a aplicação NestJS
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Generation Brasil","http://www.generationbrasil.online","generation@email.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

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
