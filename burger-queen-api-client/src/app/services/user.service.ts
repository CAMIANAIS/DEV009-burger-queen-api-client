import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userData } from '../shared/interfaces/userData.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  private urlApi = 'http://localhost:8080/users';

  httpOptions = {
    headers: new HttpHeaders({
      // Authorization es una propiedad, con el valor del token que reicibimos al iniciar sesión en el login
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  getUsers(): Observable<userData[]> {
    return this.http.get<userData[]>(this.urlApi, this.httpOptions)
  }

  postUser(user: userData): Observable<userData> {
    return this.http.post<userData>(this.urlApi, user, this.httpOptions);
  }

  updateUser(userId: string, user: userData): Observable<userData> {
    return this.http.put<userData>(`${this.urlApi}/${userId}`, user, this.httpOptions);
  }

  deleteUser(userId: string): Observable<userData> {
    console.log('userId received', userId);
    return this.http.delete<userData>(`${this.urlApi}/${userId}`, this.httpOptions);
  }
  patchUser(userId: string, updatedUser: any): Observable<any> {
    const patchUrl = `${this.urlApi}/${userId}`;
    return this.http.patch(patchUrl, updatedUser, this.httpOptions);
  }
}