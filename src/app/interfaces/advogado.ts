import { Usuario } from "./usuario";

export interface Advogado {
    id: string;
    nome: string;
    numeroOrdem: string;
    status: string;
    telefone: string;
    email:string;
    usuario: Usuario;
}