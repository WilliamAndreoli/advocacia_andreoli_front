import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private apiUrl = 'http://localhost:8080/clientes'

  constructor(private HttpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllClientes(): Observable<any> {
    const headers = this.getHeaders();
    return this.HttpClient.get<Cliente[]>(this.apiUrl, { headers });
  }

  getClientePorCpf(cpf: string): Observable<Cliente> {
    const headers = this.getHeaders();
    return this.HttpClient.get<Cliente>(`${this.apiUrl}/cpf/${cpf}`, { headers });
  }

  createCliente(cliente: any): Observable<Cliente> {
    const headers = this.getHeaders();

    return this.HttpClient.post<Cliente>(this.apiUrl, cliente, { headers });

  } 

}
