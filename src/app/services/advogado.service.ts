import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
import { Usuario } from '../interfaces/usuario';
import { Advogado } from '../interfaces/advogado';

@Injectable({
  providedIn: 'root'
})

export class AdvogadoService {
  private apiUrl = 'http://localhost:8080/advogados'

  constructor(private HttpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllAdvogados(): Observable<any> {
    const headers = this.getHeaders();
    return this.HttpClient.get<Advogado[]>(this.apiUrl, { headers });
  }

  getAdvogadoPorNumeroOrdem(numeroOrdem: string): Observable<Advogado> {
    const headers = this.getHeaders();
    return this.HttpClient.get<Advogado>(`${this.apiUrl}/numeroOrdem/${numeroOrdem}`, { headers });
  }

  getAdvogadoPorEmail(email: string): Observable<Advogado> {
    const headers = this.getHeaders();
    return this.HttpClient.get<Advogado>(`${this.apiUrl}/email/${email}`, { headers });
  }

  createAdvogado(advogado: any): Observable<Advogado> {
    const headers = this.getHeaders();

    return this.HttpClient.post<Advogado>(this.apiUrl, advogado, { headers });

  } 

  createUsuarioAdvogado(numeroOrdem: string): Observable<any> {
    const headers = this.getHeaders();

    console.log(headers.get("Authorization"))

    return this.HttpClient.post<Advogado>(`${this.apiUrl}/numeroOrdem/${numeroOrdem}`, {}, { headers });

  } 

}
