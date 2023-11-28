import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/orders.service';
import { DataService, formatCurrentDateTime } from 'src/app/services/data.service';
import { productData } from 'src/app/shared/interfaces/productData.interface';
import { ordersData } from 'src/app/shared/interfaces/orderData.interface';
import { ProductAdded } from 'src/app/shared/interfaces/productadded.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  orderForm: FormGroup;
  products: productData[] = [];
  productsToShow: productData[] = [];
  orderedProducts: { product: productData, quantity: number, price: number }[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private dataService: DataService
  ) {
    this.orderForm = this.formBuilder.group({
      clientName: ['', Validators.required],
    });
  }
  @Output() productAdded: EventEmitter<ProductAdded> = new EventEmitter<ProductAdded>();
  addProductToOrder(product: any) {
    // ...
  
    // Emitir el evento para notificar al componente principal
    this.productAdded.emit({ product, quantity: 1, price: product.price });
  }
  
  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.productsToShow = data;
      },
      error: (error) => {
        console.error('Error to get products', error);
      },
    });

  }
  filterProducts(type: string) {
    this.productsToShow = this.products.filter(product => product.type === type);
  }

  showAllProducts() {
    this.productsToShow = this.products;
  }



  navigateToReadyOrdersView() {
    this.router.navigate(['/readyOrders']);
  }
  get clientName() {
    return this.orderForm.get('clientName');
  }
}
