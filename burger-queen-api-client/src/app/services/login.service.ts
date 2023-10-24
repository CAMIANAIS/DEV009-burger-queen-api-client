import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Debes importar HttpClient para realizar solicitudes HTTP.
import { loginResponse } from '../interfaces/login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private urlApi = 'http://localhost:8080/login';
  
  constructor(private http: HttpClient) { } // Se inyecta HttpClient en el constructor.

  login(email: string, password: string): Observable<loginResponse> {
    return this.http.post<loginResponse>(this.urlApi, {
      email: email,
      password: password, 
    });
  }
}
