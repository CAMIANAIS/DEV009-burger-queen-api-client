import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadyOrdersComponent } from './ready-orders.component';
import { MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from 'src/app/services/orders.service';
import { ordersData } from 'src/app/shared/interfaces/orderData.interface';
import { HeaderComponent } from 'src/app/shared/components/header.component/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
describe('ReadyOrdersComponent', () => {
  let component: ReadyOrdersComponent;
  let fixture: ComponentFixture<ReadyOrdersComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadyOrdersComponent, HeaderComponent],
      imports: [HttpClientTestingModule,MatDialogModule,MatIconModule,MatTableModule], 
      providers: [OrderService], // Añade tu servicio o módulo de pruebas
    });

    fixture = TestBed.createComponent(ReadyOrdersComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should fetch orders', () => {
    const mockOrders = [
      { id: 1, status: 'done', client: 'Client 1', products: [] },
      { id: 2, status: 'delivered', client: 'Client 2', products: [] },
    ];

    component.ngOnInit();

    const req = httpTestingController.expectOne('https://burger-queen-api-mock-r1iq.onrender.com/orders'); // Debes ajustar la URL a tu API
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);

    expect(component.dataSource.data.length).toBe(2);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes HTTP pendientes
  });
});