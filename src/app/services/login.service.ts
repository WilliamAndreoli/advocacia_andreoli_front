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

        //console.log("Informações do token:", tokenInfo);

        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("userName", tokenInfo.userName);
        sessionStorage.setItem("name", tokenInfo.name);
        sessionStorage.setItem("authorities", tokenInfo.authorities);

        if (tokenInfo) {
          sessionStorage.setItem("userRoles", JSON.stringify(tokenInfo.roles));
          sessionStorage.setItem("userId", tokenInfo.sub);
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

}
