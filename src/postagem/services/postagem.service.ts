import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable() // indica que a classe é de serviço pode ser injetada como dependência(injetada em outras classes)
export class PostagemService {

    //iniciando ferramentamentas para classe de serviço 
    constructor(

        @InjectRepository(Postagem) // pode chamar os metedos de uma classe repositorio 
        private postagemRepository: Repository<Postagem>
    ){}

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find();
    }

    async findById(id: number): Promise<Postagem> {
        const postagem = await this.postagemRepository.findOne({where: {id}});

        if(!postagem){
            throw new HttpException("Postagem não encontrada", HttpStatus.NOT_FOUND);
        }

        return postagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        });
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {
        let buscaPostagem = await this.findById(postagem.id);

        if(!buscaPostagem || !postagem.id){
            throw new HttpException("Postagem não encontrada", HttpStatus.NOT_FOUND);
        }

        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        
        let buscaPostagem = await this.findById(id);
        
        if(!buscaPostagem){
            throw new HttpException("Postagem não encontrada", HttpStatus.NOT_FOUND);
        }   
        
        return await this.postagemRepository.delete(id);
    }

}