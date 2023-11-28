import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { OrderService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';
import { DataService } from 'src/app/services/data.service';
import { HeaderComponent } from 'src/app/shared/components/header.component/header.component';
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
import { MatIconModule } from '@angular/material/icon';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  const orderServiceSpy = jasmine.createSpyObj('OrderService', ['postOrder']);
  const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);

  const mockProductData: productData[] = [
    {
      id: 1,
      name: 'Product A',
      price: 10,
      image: 'product_a.jpg',
      type: 'Type A',
      dateEntry: '2023-10-28 15:14:10',
    },
  ];

  const mockOrderedProducts: { product: productData, quantity: number, price: number }[] = [
    {
      product: {
        id: 1,
        name: 'Producto 1',
        price: 10,
        image: 'producto1.jpg',
        type: 'Tipo 1',
        dateEntry: '2023-10-28 15:14:10'
      },
      quantity: 2,
      price: 20,
    },
  ];

  const mockOrderData: ordersData = {
    id: 1,
    userId: 1,
    client: 'John Doe',
    products: [
      {
        qty: 2,
        product: {
          id: 1,
          name: 'Product A',
          price: 10,
          image: 'product_a.jpg',
          type: 'Type A',
          dateEntry: '2023-10-28 15:14:10',
        },
      },
    ],
    status: 'pending',
    dataEntry: '2023-10-28 15:14:10',
  };

  beforeEach(() => {
    // Configura las respuestas simuladas para los espías
    productServiceSpy.getProducts.and.returnValue(of(mockProductData));
    orderServiceSpy.postOrder.and.returnValue(of(mockOrderData));

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
        MatIconModule
      ],
      providers: [
        FormBuilder,
        { provide: OrderService, useValue: orderServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
        DataService, // Agrega DataService como proveedor
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form controls', () => {
    expect(component.orderForm).toBeTruthy();
    expect(component.orderForm?.get('clientName')).toBeTruthy();
  });
  it('should  get products from services', () => {
    productServiceSpy.getProducts.and.returnValue(of(mockProductData));

    expect(component.products).toEqual(mockProductData);
    expect(component.productsToShow).toEqual(mockProductData);
    expect(productServiceSpy.getProducts).toHaveBeenCalled();
  });

  it('should add a product to the order', () => {
    component.productsToShow = mockProductData;
    component.orderedProducts = [];

    component.addProductToOrder(mockProductData[0]);

    expect(component.orderedProducts.length).toBe(1); //el producto se agrego
    expect(component.orderedProducts[0].product).toEqual(mockProductData[0]); //el producto agregado es igual al producto de muestra
  });
  it('should increment quantity of an ordered product', () => {
    const orderedProduct = {
      product: {
        id: 1,
        name: 'Producto 1',
        price: 10,
        image: 'producto1.jpg',
        type: 'Tipo 1',
        dateEntry: '2023-10-28 15:14:10'
      },
      quantity: 2,
      price: 20,
    };
  
    component.incrementQuantity(orderedProduct);
  
    expect(orderedProduct.quantity).toBe(3); // Verifica que la cantidad se haya incrementado en 1
  });
  
  it('should delete an ordered product by index', () => {
    component.orderedProducts = [...mockOrderedProducts]; // Copia los productos de muestra al componente
    const indexToDelete = 0; // Índice del producto a eliminar
  
    component.deleteProduct(indexToDelete);
  
    expect(component.orderedProducts.length).toBe(mockOrderedProducts.length - 1); // Verifica que un producto se haya eliminado
    expect(component.orderedProducts[indexToDelete]).toBeUndefined(); // Verifica que el producto eliminado sea undefined
  });

  it('should create and post an order with the current date and time', (done) => {
    spyOn(localStorage, 'getItem').and.returnValue('1'); // Simula el valor de 'idUser'

    // Espía la función formatCurrentDateTime y haz que devuelva una fecha ficticia
    spyOn(component['dataService'], 'getCurrentDateTimeFormatted').and.returnValue(mockOrderData.dataEntry);

    component.orderForm.setValue({ clientName: 'Ejemplo1' });
    component.orderedProducts = mockOrderedProducts;

    // Simula la llamada a postOrder
    orderServiceSpy.postOrder.and.returnValue(of(mockOrderData));

    // Llama a createOrder
    component.createOrder();

    // Verifica que la orden haya sido creada y enviada
    expect(component.orderedProducts.length).toBe(0); // Se espera que se hayan eliminado los productos de la orden
    expect(orderServiceSpy.postOrder).toHaveBeenCalledWith({
      id: 0,
      userId: 1,
      client: 'Ejemplo1',
      products: mockOrderedProducts.map((product) => ({
        qty: product.quantity,
        product: product.product,
      })),
      status: 'pending',
      dataEntry: mockOrderData.dataEntry, // Utiliza la fecha y hora ficticias directamente
    });

    done(); // Importante para notificar que la prueba ha finalizado
  });

  it('should reset the order and form', () => {
    component.orderedProducts = [...mockOrderedProducts]; // Copia los productos de muestra al componente
    component.orderForm.setValue({ clientName: 'Ejemplo1' });
  
    component.resetOrder();
  
    expect(component.orderedProducts.length).toBe(0); // Verifica que se hayan eliminado los productos de la orden
    expect(component.orderForm.value.clientName).toBeNull(); // Cambia '' a toBeNull()
  });
  
  it('should calculate the total to pay for ordered products', () => {
    component.orderedProducts = [...mockOrderedProducts]; // Copia los productos de muestra al componente
  
    const expectedTotal = mockOrderedProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  
    const totalToPay = component.getTotal();
  
    expect(totalToPay).toBe(expectedTotal);
  });
});
