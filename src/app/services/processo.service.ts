import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Processo } from '../interfaces/processo';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  private apiUrl = 'http://localhost:8080/processos'

  constructor(private HttpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllProcessos() {
    const headers = this.getHeaders();
    return this.HttpClient.get<Processo[]>(this.apiUrl, { headers });
  }

  getAllProcessosPorCliente(cpf: string) {
    const headers = this.getHeaders();
    console.log(cpf)
    console.log(`${this.apiUrl}/cliente/${cpf}`)
    return this.HttpClient.get<Processo[]>(`${this.apiUrl}/cliente/${cpf}`, { headers });
  }

}
