import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ordersData } from '../shared/interfaces/orderData.interface';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'; // Import switchMap

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private accessToken = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    console.log('AccessToken:', this.accessToken);
  }

  private urlApi: string = 'http://localhost:8080/orders';

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
    console.log(order);
    return this.http.post<ordersData>(this.urlApi, order, this.httpOptions);
  }

  deleteOrder(orderId: number): Observable<void> {
    const url = `${this.urlApi}/${orderId}`;
    return this.http.delete<void>(url, this.httpOptions);
  }

  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
    const url = `${this.urlApi}/${orderId}`;
  
    // Fetch the existing order data first
    return this.http.get<ordersData>(url, this.httpOptions).pipe(
      switchMap((existingOrder: ordersData) => {
        // Calculate the current timestamp for dateProcessed
        const dateProcessed = new Date().toISOString();
  
        // Merge the new status and dateProcessed into the existing order data
        const updatedOrder = {
          ...existingOrder,
          status: newStatus,
          dateProcessed: dateProcessed,
        };
  
        // Send an HTTP PUT request to update the order status
        return this.http.put(url, updatedOrder, this.httpOptions);
      })
    );
  }
  
}
