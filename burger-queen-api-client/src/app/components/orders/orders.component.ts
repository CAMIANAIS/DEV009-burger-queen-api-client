import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { productData } from 'src/app/shared/interfaces/productData.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  products: productData[] = []; // Inicializa la propiedad como un arreglo vacío

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data; // Asigna los datos de productos a la propiedad
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }
}