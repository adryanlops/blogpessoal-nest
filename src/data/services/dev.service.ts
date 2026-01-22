import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres', // Ou 'mysql', verifique qual você criou no Render
      host: process.env.DB_HOST, 
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Postagem, Tema, Usuario],
      synchronize: true, // Em produção, geralmente usa-se false com migrations
      ssl: {
        rejectUnauthorized: false, // Necessário para conectar ao banco do Render
      },
    };
  }
}