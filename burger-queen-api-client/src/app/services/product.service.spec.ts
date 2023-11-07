import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { productData } from '../shared/interfaces/productData.interface';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verificar que no hayan solicitudes pendientes y limpiar el HttpTestingController después de cada prueba
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    const mockProducts: productData[] = [
      // ... tu arreglo de datos simulados aquí
    ];

    service.getProducts().subscribe((data) => {
      expect(data).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne('https://burger-queen-api-mock-r1iq.onrender.com/products');
    expect(req.request.method).toEqual('GET');

    req.flush(mockProducts);
  });

  it('should post a product', () => {
    const newProduct: productData = {
        id: 1,
        name: 'Product A',
        price: 10,
        image: 'product_a.jpg',
        type: 'Type A',
        dateEntry: '2023-10-28 15:14:10',
      };

    service.postProducts(newProduct).subscribe((data) => {
      expect(data).toEqual(newProduct);
    });

    const req = httpTestingController.expectOne('https://burger-queen-api-mock-r1iq.onrender.com/products');
    expect(req.request.method).toEqual('POST');

    req.flush(newProduct);
  });

  it('should delete a product', () => {
    const productId = '1'; // ID del producto a eliminar

    service.deleteProduct(productId).subscribe((data) => {
      expect(data).toBeTruthy(); // Podrías validar la respuesta si esperas una respuesta diferente
    });

    const req = httpTestingController.expectOne(`https://burger-queen-api-mock-r1iq.onrender.com/products/${productId}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({}); // Podrías simular la respuesta si es necesario
  });

  it('should patch a product', () => {
    const productId = '1'; // ID del producto a actualizar
    const updatedProduct = {
        id: 1,
        name: 'Product A',
        price: 15,
        image: 'product_a.jpg',
        type: 'Type A',
        dateEntry: '2023-10-28 15:14:10',
      };

    service.patchProduct(productId, updatedProduct).subscribe((data) => {
      expect(data).toEqual(updatedProduct);
    });

    const req = httpTestingController.expectOne(`https://burger-queen-api-mock-r1iq.onrender.com/products/${productId}`);
    expect(req.request.method).toEqual('PATCH');

    req.flush(updatedProduct);
  });
});
