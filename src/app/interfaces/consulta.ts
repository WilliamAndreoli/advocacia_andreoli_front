import { Cliente } from "./cliente";

export interface Consulta {
    id: number;
    valor: DoubleRange;
    dataMarcada: Date;
    dataRealizada: Date;
    pagamento: string;
    dataPagamento: Date;
    meioPagamento: string;
    resumo: string;
    status: string;
    cliente: Cliente;
}