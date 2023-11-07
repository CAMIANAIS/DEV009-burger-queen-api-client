import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './orders.service';
import { ordersData } from '../shared/interfaces/orderData.interface';

describe('OrderService ', () => {
  let service: OrderService;
  let httpTestingController: HttpTestingController;
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
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService],
    });
    service = TestBed.inject(OrderService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should post an order', () => {
    service.postOrder(mockOrderData).subscribe((order) => {
      expect(order).toEqual(mockOrderData);
    });

    const req = httpTestingController.expectOne(service['urlApi']);
    expect(req.request.method).toBe('POST');
    req.flush(mockOrderData);
  });

  // Puedes continuar escribiendo pruebas para los otros métodos del servicio

  it('should delete an order', () => {
    const orderId = 1;
    service.deleteOrder(orderId).subscribe(() => {
      // La solicitud de eliminación no devuelve ningún dato
      expect().nothing();
    });

    const req = httpTestingController.expectOne(`${service['urlApi']}/${orderId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update the status of an order', () => {
    const orderId = 1;
    const newStatus = 'delivered';

    // Simula la solicitud de obtención de la orden existente
    service.updateOrderStatus(orderId, newStatus).subscribe(() => {
      // La solicitud de actualización no devuelve ningún dato
      expect().nothing();
    });

    const reqGet = httpTestingController.expectOne(`${service['urlApi']}/${orderId}`);
    expect(reqGet.request.method).toBe('GET');

    reqGet.flush(mockOrderData);

    const reqPut = httpTestingController.expectOne(`${service['urlApi']}/${orderId}`);
    expect(reqPut.request.method).toBe('PUT');
    reqPut.flush({});
  });
});
