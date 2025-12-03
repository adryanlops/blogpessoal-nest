import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../entities/postagem.entity';
import { DeleteResult } from 'typeorm';

@Controller("/postagens") // indica que a classe é um controlador e define a rota base para os endpoints
export class PostagemController{ 

    constructor(private readonly postagemService: PostagemService){}

    @Get() // define um endpoint GET para a rota /postagens
    @HttpCode(HttpStatus.OK) // define o código de status HTTP para a resposta
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll();
    }

    @Get("/:id") // define um endpoint GET para a rota /postagens/:id
    @HttpCode(HttpStatus.OK) // define o código de status HTTP para a resposta
    findById( @Param("id", ParseIntPipe) id:number): Promise<Postagem> { 
        return this.postagemService.findById(id);
    }

    @Get("/titulo/:titulo") 
    @HttpCode(HttpStatus.OK)  
    findByAllTitulo( @Param("titulo") titulo:string): Promise<Postagem[]> { 
        return this.postagemService.findByTitulo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.create(postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.update(postagem);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete( @Param("id", ParseIntPipe) id:number): Promise<DeleteResult> {
        return this.postagemService.delete(id);
    }

}