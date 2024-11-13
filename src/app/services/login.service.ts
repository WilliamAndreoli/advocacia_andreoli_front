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
    console.log("Payload enviado:", payload)
    return this.HttpClient.post<LoginResponse>("http://localhost:8080/auth/login", payload).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("userName", value.name)
        console.log("Token JWT armazenado:", value.token)
      })
    )
  }

}
