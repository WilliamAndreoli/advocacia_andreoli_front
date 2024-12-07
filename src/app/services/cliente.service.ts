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

  getAllClientesAtivos(page: number = 0, size: number = 10): Observable<any> {
    const headers = this.getHeaders();
    return this.HttpClient.get<Cliente[]>(`${this.apiUrl}/ativos`, { 
      headers,
      params: {
        page: page.toString(),
        size: size.toString()
      } 
    });
  }

  getClientePorCpf(cpf: string | null): Observable<Cliente> {
    const headers = this.getHeaders();
    return this.HttpClient.get<Cliente>(`${this.apiUrl}/cpf/${cpf}`, { headers });
  }

  getClientePorEmail(email: string): Observable<Cliente> {
    const headers = this.getHeaders();
    return this.HttpClient.get<Cliente>(`${this.apiUrl}/email/${email}`, { headers });
  }

  getClientePorNome(nome: string): Observable<Cliente> {
    const headers = this.getHeaders();
    return this.HttpClient.get<Cliente>(`${this.apiUrl}/nome/${nome}`, { headers });
  }

  createCliente(cliente: any): Observable<Cliente> {
    const headers = this.getHeaders();

    return this.HttpClient.post<Cliente>(this.apiUrl, cliente, { headers });
  } 

  createUsuarioCliente(nome: string): Observable<any> {
    const headers = this.getHeaders();

    //console.log(headers.get("Authorization"))

    return this.HttpClient.post<Cliente>(`${this.apiUrl}/nome/${nome}`, {}, { headers });

  } 

  atualizarCliente(cpf: string, dadosCliente: Cliente): Observable<any> {
    const headers = this.getHeaders();

    return this.HttpClient.put<Cliente>(`${this.apiUrl}/cpf/${cpf}`, dadosCliente, { headers });
  }

  alteraStatus(cpf: string, cliente: any) {
    const headers = this.getHeaders();
    if (cliente.status == "ATIVO") {
      console.log("Entrou no if")
      console.log(`${this.apiUrl}/status/${cpf}`)
      cliente.status = "INATIVO"
      console.log(cliente.status)
      return this.HttpClient.put<Cliente>(`${this.apiUrl}/status/${cpf}`, cliente, { headers })
    } else {
      return this.HttpClient.put<Cliente>(`${this.apiUrl}/status/${cpf}`, cliente, { headers })
    }
  }

}
