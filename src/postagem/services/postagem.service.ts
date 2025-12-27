import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TemaService } from "../../tema/services/tema.service";


@Injectable() // indica que a classe é de serviço pode ser injetada como dependência(injetada em outras classes)
export class PostagemService {

    //iniciando ferramentamentas para classe de serviço 
    constructor(

        @InjectRepository(Postagem) // pode chamar os metedos de uma classe repositorio 
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService
    ){}

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            relations:{
                tema: true,
                usuario: true
            }
        });
    }

    async findById(id: number): Promise<Postagem> {

        let postagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations:{
                tema: true,
                usuario: true
            }
        });

        if (!postagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

        return postagem;
    }

    async findAllByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)
            },
            relations:{
                tema: true,
                usuario: true
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        if (postagem.tema) {
            let tema = await this.temaService.findById(postagem.tema.id)

            if (!tema) {
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
            }

        }

        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {
        // Chama o método findById anteriro para pesquisar uma postagem pelo id extraido do objeto postagem
        let buscaPostagem = await this.findById(postagem.id);

        // Se a postagem não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
        if (!buscaPostagem || !postagem.id) {
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
        }

        if (postagem.tema) {
            let tema = await this.temaService.findById(postagem.tema.id)

            if (!tema) {
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
            }

        }

        // Se a postagem foi encontrada, cadastra ela no BD e retorna ela
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