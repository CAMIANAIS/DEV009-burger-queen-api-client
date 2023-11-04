import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KitchenComponent } from './kitchen.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderService } from 'src/app/services/orders.service';
import { ordersData } from 'src/app/shared/interfaces/orderData.interface';
import { HeaderComponent } from 'src/app/shared/components/header.component/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('KitchenComponent', () => {
  let component: KitchenComponent;
  let fixture: ComponentFixture<KitchenComponent>;

  const orderServiceSpy = jasmine.createSpyObj('OrderService', ['getOrders', 'deleteOrder', 'updateOrderStatus']);
  const mockOrders: ordersData[] = [
    {
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

  beforeEach(async () => {
    orderServiceSpy.getOrders.and.returnValue(of(mockOrders));
    TestBed.configureTestingModule({
      declarations: [KitchenComponent, HeaderComponent],
      imports: [MatTableModule, MatSortModule, HttpClientTestingModule, MatIconModule, MatDialogModule,BrowserAnimationsModule],
      providers: [{ provide: OrderService, useValue: orderServiceSpy }],
    }).compileComponents();
   
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete an order by index', () => {
    component.dataSource.data = [...mockOrders]; // Copia los datos de la fuente de datos

    const indexToDelete = 0; // Índice de la orden a eliminar
    const orderToDelete = mockOrders[indexToDelete];

    component.deleteOrder(orderToDelete);

    // Verifica que la orden se haya eliminado de la fuente de datos de la tabla
    expect(component.dataSource.data.length).toBe(mockOrders.length - 1); // Verifica que se haya eliminado una orden
    expect(component.dataSource.data).not.toContain(orderToDelete); // Verifica que la orden eliminada no esté en la fuente de datos
  });


it('should change order status to "done" for a "pending" order', () => {
  // Simula que el servicio devolverá un valor exitoso al actualizar el estado
  orderServiceSpy.updateOrderStatus.and.returnValue(of(true));

  component.changeStatusOrder(mockOrderData);

  // Verifica que el estado de la orden se haya cambiado a "done"
  expect(mockOrderData.status).toBe('done');
  // Verifica que se llamó al método para actualizar el estado en el servicio
  expect(orderServiceSpy.updateOrderStatus).toHaveBeenCalledWith(mockOrderData.id, 'done');
});

it('should calculate elapsed time for an order', () => {

  const elapsedTime = component.calculateElapsedTimeForOrder(mockOrderData);

  // Verifica que el tiempo transcurrido se calcule correctamente
  expect(elapsedTime).toBe(''); // O el formato deseado
});

});

