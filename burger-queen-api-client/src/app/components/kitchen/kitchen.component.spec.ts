import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KitchenComponent } from './kitchen.component';
import { MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderService } from 'src/app/services/orders.service';
import { ordersData } from 'src/app/shared/interfaces/orderData.interface';
import { HeaderComponent } from 'src/app/shared/components/header.component';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

describe('KitchenComponent', () => {
  let component: KitchenComponent;
  let fixture: ComponentFixture<KitchenComponent>;
  const orderServiceSpy = jasmine.createSpyObj('OrderService', ['postOrder']);
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

  const mockOrder: ordersData = {
    id: 1,
    userId: 2,
    client: 'Client Name',
    products: [],
    status: 'done',
    dataEntry: '2023-10-31T01:00:00.000Z',
    dateProcessed: '2023-10-31T01:30:00.000Z',
  };
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [KitchenComponent,HeaderComponent],
      imports: [MatTableModule, HttpClientTestingModule,MatIconModule], // Agrega HttpClientTestingModule aquí
      providers: [OrderService],
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

;


  /*it('should delete an order', () => {
    // Arrange
    spyOn(orderServiceSpy, 'deleteOrder').and.returnValue(of(null));

    // Act
    component.deleteOrder(mockOrder);

    expect(orderServiceSpy.deleteOrder).toHaveBeenCalledWith(mockOrder.id);
  });

  it('should change status of an order', () => {

    spyOn(orderServiceSpy, 'updateOrderStatus').and.returnValue(of(null));

    // Act
    component.changeStatusOrder(mockOrder);

    // Assert
    // Asegúrate de que se haya llamado a updateOrderStatus en orderService con los parámetros correctos.
    expect(orderServiceSpy.updateOrderStatus).toHaveBeenCalledWith(mockOrder.id, 'done');
  });*/
  it('should calculate elapsed time for order', () => {
    // Arrange
    
    const elapsedTime = component.calculateElapsedTimeForOrder(mockOrder);
    expect(elapsedTime).toBe('00:30:00');
  });
});
