import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

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

  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    const headers = this.getHeaders();
    return this.HttpClient.put<Usuario>(`${this.apiUrl}/${id}`, usuario, { headers });
  }
}