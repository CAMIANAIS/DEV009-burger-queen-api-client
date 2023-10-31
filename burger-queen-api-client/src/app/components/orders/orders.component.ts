import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/orders.service';
import { productData } from 'src/app/shared/interfaces/productData.interface';
import { ordersData } from 'src/app/shared/interfaces/orderData.interface';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderForm: FormGroup;
  products: productData[] = [];
  productsToShow: productData[] = [];
  orderedProducts: { product: productData, quantity: number, price: number }[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
  ) {
    this.orderForm = this.formBuilder.group({
      clientName: ['', Validators.required],
    });
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

  addProductToOrder(product: productData) {
    if (this.productsToShow.some(p => p.id === product.id)) {
      const orderedProduct = this.orderedProducts.find(item => item.product.id === product.id);
  
      if (orderedProduct) {
        orderedProduct.quantity++;
        orderedProduct.price += product.price;
      } else {
        this.orderedProducts.push({ product, quantity: 1, price: product.price }); 
      }
    }
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

  orderSuccess: boolean = false;
  createOrder() {
    if (this.orderForm.valid && this.orderedProducts.length > 0) {
      const clientName = this.orderForm.get('clientName')?.value || '';
      const orderedProductsArray = this.orderedProducts.map((item) => ({
        qty: item.quantity,
        product: item.product,
      }));
      const userIdString = localStorage.getItem('idUser');
      const userId = userIdString ? +userIdString : 0;
      const newOrder: ordersData = {
        id: 0,
        userId: userId,
        client: clientName,
        products: orderedProductsArray,
        status: 'pending',
        dataEntry: new Date().toISOString(),
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
  get clientName() {
    return this.orderForm.get('clientName');
  }


}
