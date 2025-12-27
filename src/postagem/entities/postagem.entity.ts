import { IsNotEmpty} from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

// indicando que a classe é uma entidade que vai controlar a tabela tb_postagens no banco de dados
@Entity({ name: "tb_postagens" }) 
export class Postagem {

    //chave primeira e auto incremental 
    @ApiProperty() 
    @PrimaryGeneratedColumn() 
    id: number;
    
    @ApiProperty() 
    @IsNotEmpty() // NOT NULL
    @Column({ length: 100, nullable: false })
    titulo: string;

    @ApiProperty() 
    @IsNotEmpty() 
    @Column({ length: 100, nullable: false })
    texto: string;

    @ApiProperty() 
    @UpdateDateColumn()
    data: Date;

    @ApiProperty({ type: () => Tema }) 
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema

    @ApiProperty({ type: () => Usuario })  
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario

}