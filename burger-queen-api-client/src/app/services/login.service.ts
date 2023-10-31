import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { LoginMatcher } from '../shared/interfaces/login.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private urlApi = 'http://localhost:8080/login';

  constructor(private http: HttpClient,private router: Router) { }

  login(email: string, password: string): Observable<LoginMatcher> {
    return this.http.post<LoginMatcher>(this.urlApi, {
      email: email,
      password: password,
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    console.log('userInfo', localStorage);
  }
}