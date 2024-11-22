import { TipoUsuario } from "./tipoUsuario";

export interface Usuario {
    id: number;
  username: string;
  name: string;
  status: string;
  tipoUsuario: TipoUsuario;
}
