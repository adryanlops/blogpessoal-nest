import { Injectable } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { Repository } from "typeorm";
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

}