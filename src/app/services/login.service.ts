import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../types/login-response.types';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private HttpClient: HttpClient) { }

  login(userName: string, password: string) {
    const payload = { userName, password}

    //console.log("Payload enviado:", payload)
    return this.HttpClient.post<LoginResponse>("http://localhost:8080/auth/login", payload).pipe(
      tap((value) => {
        const tokenInfo = this.decodeJWTToken(value.token);

        //console.log("Informações do token:", tokenInfo)

        if (tokenInfo) {
          const expirationDate = new Date(tokenInfo.exp * 1000);
          sessionStorage.setItem("auth-token", value.token);
          sessionStorage.setItem("userName", tokenInfo.userName);
          sessionStorage.setItem("name", tokenInfo.name);
          sessionStorage.setItem("authorities", tokenInfo.authorities);
          sessionStorage.setItem("userId", tokenInfo.id);
          sessionStorage.setItem("token-expiration", expirationDate.toISOString());
          //console.log(expirationDate)
        }

      })
    )
  }

   decodeJWTToken(token: string) {
    try {
      // O token JWT tem 3 partes separadas por '.'
      // Pegamos a segunda parte (payload) e decodificamos
      const base64Payload = token.split('.')[1];
      // Decodifica o base64 e converte para string
      const payload = atob(base64Payload);
      // Converte a string em objeto JSON
      return JSON.parse(payload);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  isTokenExpired(): boolean {
    const expiration = sessionStorage.getItem("token-expiration");
    if (expiration) {
      const expirationDate = new Date(expiration); // UTC
      const now = new Date(); // Também no horário local, mas o JS ajusta para comparar UTC internamente
      console.log("Expirationdate: ", expirationDate, "now: ", now)
      return expirationDate <= now; // Comparação direta
    }
    return true; // Considera expirado se não houver data
  }

}
