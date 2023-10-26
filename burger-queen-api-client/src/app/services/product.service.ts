import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'; // Debes importar HttpClient para realizar solicitudes HTTP.
import { productData } from '../shared/interfaces/productData.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

    private accessToken = localStorage.getItem('token');

    constructor(private http: HttpClient) {
  
      console.log('AccessToken:', this.accessToken);
    }
  
    private urlApi:string = 'http://localhost:8080/products';
    
    httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
  
    getProducts(): Observable<productData[]> {
      console.log('token', this.httpOptions.headers);
      
      return this.http.get<productData[]>(this.urlApi, this.httpOptions);
    }
    postProducts(product: productData): Observable<productData> {
        return this.http.post<productData>(this.urlApi, product, this.httpOptions);
      }
}