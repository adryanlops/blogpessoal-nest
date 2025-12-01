import { IsNotEmpty} from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// indicando que a classe é uma entidade que vai controlar a tabela tb_postagens no banco de dados
@Entity({ name: "tb_postagens" }) 
export class Postagem {

    //chave primeira e auto incremental 
    @PrimaryGeneratedColumn() 
    id: number;
    
    @IsNotEmpty() // NOT NULL
    @Column({ length: 100, nullable: false })
    titulo: string;

    @IsNotEmpty() 
    @Column({ length: 100, nullable: false })
    texto: string;

    @UpdateDateColumn()
    data: Date;

}