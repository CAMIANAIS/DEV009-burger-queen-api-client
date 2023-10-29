import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'; // Debes importar HttpClient para realizar solicitudes HTTP.
import { ordersData } from '../shared/interfaces/orderData.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

    private accessToken = localStorage.getItem('token');

    constructor(private http: HttpClient) {
  
      console.log('AccessToken:', this.accessToken);
    }
  
    private urlApi:string = 'http://localhost:8080/orders';
    
    httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
  
    getOrders(): Observable<ordersData[]> {
      console.log('token', this.httpOptions.headers);
      
      return this.http.get<ordersData[]>(this.urlApi, this.httpOptions);
    }
    postOrder(order: ordersData): Observable<ordersData> {
        return this.http.post<ordersData>(this.urlApi, order, this.httpOptions);
      }
}