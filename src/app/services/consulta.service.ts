import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Consulta } from '../interfaces/consulta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private apiUrl = 'http://localhost:8080/consultas'

  constructor(private HttpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllConsultas() {
    const headers = this.getHeaders();
    return this.HttpClient.get<Consulta[]>(this.apiUrl, { headers });
  } 

  getConsultasPorCliente(nomeCliente: string){
    const headers = this.getHeaders();
    return this.HttpClient.get<Consulta[]>(`${this.apiUrl}/cliente/${nomeCliente}`, { headers });
  }
  
  getAllConsultasPageable(page: number = 0, size: number = 10): Observable<any> {
    const headers = this.getHeaders();
    return this.HttpClient.get<Consulta[]>(`${this.apiUrl}/pageable`, { 
      headers,
      params: {
        page: page.toString(),
        size: size.toString()
      } 
    });
  }

}
