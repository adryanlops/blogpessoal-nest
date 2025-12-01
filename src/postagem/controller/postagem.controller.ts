import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../entities/postagem.entity';

@Controller("/postagens") // indica que a classe é um controlador e define a rota base para os endpoints
export class PostagemController{ 

    constructor(private readonly postagemService: PostagemService){}

    @Get() // define um endpoint GET para a rota /postagens
    @HttpCode(HttpStatus.OK) // define o código de status HTTP para a resposta
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll();
    }

}