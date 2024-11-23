import { Processo } from "./processo";

export interface Documentos_Processo {
    id: string;
    nomeArquivo: string;
    caminhoArquivo: string;
    processo: Processo;
}