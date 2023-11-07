import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'; 
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
  
    private urlApi:string = 'https://burger-queen-api-mock-r1iq.onrender.com/products';
    
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
    deleteProduct(productId: string): Observable<any> {
      const deleteUrl = `${this.urlApi}/${productId}`;
      return this.http.delete(deleteUrl, this.httpOptions);
    }
    
    patchProduct(productId: string, updatedProduct: any): Observable<any> {
      const patchUrl = `${this.urlApi}/${productId}`;
      return this.http.patch(patchUrl, updatedProduct, this.httpOptions);
    }
}