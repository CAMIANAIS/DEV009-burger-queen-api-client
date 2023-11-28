import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/orders.service';
import { DataService, formatCurrentDateTime } from 'src/app/services/data.service';
import { productData } from 'src/app/shared/interfaces/productData.interface';
import { ordersData } from 'src/app/shared/interfaces/orderData.interface';
import { ProductAdded } from 'src/app/shared/interfaces/productadded.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @Input() orderedProducts: { product: productData, quantity: number, price: number }[] = [];
  orderForm: FormGroup;
  products: productData[] = [];
  productsToShow: productData[] = [];
  orderSuccess: boolean = false;

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

  ngOnInit() {
    // Puedes realizar tareas de inicialización aquí si es necesario
  }

  onProductAdded(productAdded: ProductAdded) {
    console.log('Product added in main component:', productAdded);
    this.orderedProducts.push(productAdded);
  }

  incrementQuantity(item: { product: productData, quantity: number, price: number }) {
    item.quantity++;
  }

  deleteProduct(index: number) {
    if (index >= 0 && index < this.orderedProducts.length) {
      this.orderedProducts.splice(index, 1);
      console.log('Producto eliminado');
    }
  }

  createOrder() {
    if (this.orderForm.valid && this.orderedProducts.length > 0) {
      const clientName = this.orderForm.get('clientName')?.value || '';
      const orderedProductsArray = this.orderedProducts.map((item) => ({
        qty: item.quantity,
        product: item.product,
      }));
      const userIdString = localStorage.getItem('idUser');
      const userId = userIdString ? +userIdString : 0;

      // Obtén la hora actual en formato "HH:mm:ss" utilizando el servicio DataService
      const currentDateTime = this.dataService.getCurrentDateTimeFormatted();

      const newOrder: ordersData = {
        id: 0,
        userId: userId,
        client: clientName,
        products: orderedProductsArray,
        status: 'pending',
        dataEntry: currentDateTime
      };

      this.orderService.postOrder(newOrder).subscribe({
        next: (response: ordersData) => {
          // Orden exitosamente creada
          this.orderSuccess = true;
          this.resetOrder();
        },
        error: (error: any) => {
          console.error('Error al crear la orden:', error);
        }
      });
    }
  }
  resetOrder() {
    this.orderedProducts = [];
    this.orderForm.reset();
  }

  getTotal() {
    let totalToPay = 0;
    for (const product of this.orderedProducts) {
      totalToPay += product.price * product.quantity;
    }
    return totalToPay;
  }

  navigateToReadyOrdersView() {
    this.router.navigate(['/readyOrders']);
  }

  get clientName() {
    return this.orderForm.get('clientName');
  }
}
