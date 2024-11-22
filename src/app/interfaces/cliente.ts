import { Usuario } from "./usuario";

export interface Cliente {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    rg: string;
    telefone: string;
    endereco: string;
    nome_pai: string;
    nome_mae: string;
    ctps: string;
    cnh: string;
    data_nascimento: string;
    status: string;
    usuario: Usuario;
}