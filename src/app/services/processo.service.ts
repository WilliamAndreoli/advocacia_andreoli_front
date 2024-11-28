import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Processo } from '../interfaces/processo';
import { Observable } from 'rxjs';

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

  getProcessoPorNumeroProcesso(numeroProcesso: string) {
    const headers = this.getHeaders();
    return this.HttpClient.get<Processo>(`${this.apiUrl}/numeroProcesso/${numeroProcesso}`, { headers });
  }

  getAllProcessosPorCliente(cpf: string) {
    const headers = this.getHeaders();
    //console.log(cpf)
    //console.log(`${this.apiUrl}/cliente/${cpf}`)
    return this.HttpClient.get<Processo[]>(`${this.apiUrl}/cliente/${cpf}`, { headers });
  }

  getAllProcessosPorAdvogado(numeroOrdem: string, page: number = 0, size: number = 10): Observable<any> {
    const headers = this.getHeaders();
    //console.log(numeroOrdem)
    //console.log(`${this.apiUrl}/advogado/${numeroOrdem}`)
    return this.HttpClient.get<Processo[]>(`${this.apiUrl}/advogado/${numeroOrdem}`, { 
      headers, 
      params: {
        page: page.toString(),
        size: size.toString()
      } 
    });
  }

  atualizarProcesso(numeroProcesso: string, dadosProcesso: Processo): Observable<any> {
    const headers = this.getHeaders();

    return this.HttpClient.put<Processo>(`${this.apiUrl}/numeroProcesso/${numeroProcesso}`, dadosProcesso, { headers });
  }

  alterarStatusPocesso(numeroProcesso: string): Observable<any> {
    const headers = this.getHeaders();

    return this.HttpClient.put<Processo>(`${this.apiUrl}/status/${numeroProcesso}`, { headers });
  }

  createProcesso(processo: any): Observable<Processo> {
    const headers = this.getHeaders();

    console.log(processo)

    return this.HttpClient.post<Processo>(this.apiUrl, processo, { headers });
  }

}
