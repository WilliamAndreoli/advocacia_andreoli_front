import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private apiUrl = 'http://localhost:8080/contato';

  constructor(private http: HttpClient) { }

  enviarMensagem(dados: any) {
    return this.http.post(this.apiUrl, dados, { responseType: 'text' });
  }

}
