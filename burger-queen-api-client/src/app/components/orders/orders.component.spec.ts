import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { OrderService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';
import { HeaderComponent } from 'src/app/shared/components/header.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { productData } from 'src/app/shared/interfaces/productData.interface';
import { ordersData } from 'src/app/shared/interfaces/orderData.interface';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  const orderServiceSpy = jasmine.createSpyObj('OrderService', ['getOrders', 'postOrder']);
  const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);

  beforeEach(() => {
    orderServiceSpy.getOrders.calls.reset();
    productServiceSpy.getProducts.calls reset();

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      declarations: [OrdersComponent, HeaderComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [
        FormBuilder,
        { provide: OrderService, useValue: orderServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockOrderData: ordersData = {
    id: 1,
    userId: 'user123',
    client: 'John Doe',
    table: 'Table 1',
    products: [
      {
        qty: 2,
        product: {
          id: 'product1',
          name: 'Product A',
          price: 10,
          image: 'product_a.jpg',
          type: 'Type A',
          dateEntry: '2023-10-28',
        },
        price: 20,
      },
    ],
    status: 'In Progress',
    dataEntry: '2023-10-28',
    timer: 120,
  };

  const mockProductData: productData[] = [
    {
      id: 'product1',
      name: 'Product A',
      price: 10,
      image: 'product_a.jpg',
      type: 'Type A',
      dateEntry: '2023-10-28',
    },
  ];

  it('should initialize the form controls', () => {
    expect(component.orderForm.get('clientName')).toBeTruthy();
    expect(component.orderForm.get('tableNumber')).toBeTruthy();
  });

  it('should get orders and products from services', () => {
    orderServiceSpy.getOrders.and.returnValue(of(mockOrderData));
    productServiceSpy.getProducts.and.returnValue(of(mockProductData));

    component.ngOnInit(); // Trigger the initialization

    expect(component.products).toEqual(mockProductData);
    expect(component.productsToShow).toEqual(mockProductData);
    expect(orderServiceSpy.getOrders).toHaveBeenCalled();
    expect(productServiceSpy.getProducts).toHaveBeenCalled();
  });

  it('should add a product to the order', () => {
    component.productsToShow = mockProductData;
    component.addProductToOrder(mockProductData[0]);
    expect(component.orderedProducts.length).toBe(1);
  });

});
