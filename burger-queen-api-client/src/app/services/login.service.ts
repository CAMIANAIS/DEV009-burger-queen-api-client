import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { LoginMatcher } from '../shared/interfaces/login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private urlApi = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginMatcher> {
    return this.http.post<LoginMatcher>(this.urlApi, {
      email: email,
      password: password,
    });
  }
}