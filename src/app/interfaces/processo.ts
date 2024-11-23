import { Advogado } from "./advogado";
import { Cliente } from "./cliente";
import { Documentos_Processo } from "./documentos_Processo";

export interface Processo {
    id: string;
    numeroProcesso: string;
    juiz: string;
    area: string;
    comarca: string;
    status: string;
    valor_processo: DoubleRange;
    advogado: Advogado;
    cliente: Cliente;
    documentos_Processo: Documentos_Processo[];
}