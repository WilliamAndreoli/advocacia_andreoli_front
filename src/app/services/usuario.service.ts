import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { TipoUsuario } from '../interfaces/tipoUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/usuarios'

  constructor(private HttpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllUsuarios(): Observable<Usuario[]> {
    const headers = this.getHeaders();
    return this.HttpClient.get<Usuario[]>(this.apiUrl, { headers }).pipe(
      tap(usuarios => {
        console.log('Usuários carregados:', usuarios);
      })
    );
  }

  getUsuarioByUsername(username: string): Observable<Usuario> {
    const headers = this.getHeaders();
    console.log(`${this.apiUrl}/username/${username}`)
    return this.HttpClient.get<Usuario>(`${this.apiUrl}/username/${username}`, { headers });
  }

  createUsuario(usuario: any): Observable<Usuario> {
    console.log("Entrou create usuario")
    const headers = this.getHeaders();

    console.log(usuario.userName)

    return this.HttpClient.post<Usuario>(this.apiUrl, usuario, { headers });
  }

  updateUsuario(username: string, usuario: any): Observable<Usuario> {
    const headers = this.getHeaders();
    return this.HttpClient.put<Usuario>(`${this.apiUrl}/username/${username}`, usuario, { headers });
  }

  alteraStatus(username: string, usuario: any) {
    const headers = this.getHeaders();
    if (usuario.status == "ATIVO") {
      console.log("Entrou no if")
      console.log(`${this.apiUrl}/status/${username}`)
      usuario.status = "INATIVO"
      console.log(usuario.status)
      return this.HttpClient.put<Usuario>(`${this.apiUrl}/status/${username}`, usuario, { headers })
    } else {
      return this.HttpClient.put<Usuario>(`${this.apiUrl}/status/${username}`, usuario, { headers })
    }

    
  }
}