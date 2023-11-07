import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AdminProductsComponent } from './admin-products.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { of } from 'rxjs';
import { productData } from 'src/app/shared/interfaces/productData.interface';

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let productService: jasmine.SpyObj<ProductService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  const mockProductData: productData = {
    id: 1,
    name: 'Product A',
    price: 10,
    image: 'product_a.jpg',
    type: 'Type A',
    dateEntry: '2023-10-28 15:14:10',
  };

  beforeEach(() => {
    productService = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct', 'patchProduct', 'postProducts']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']);
    dialogRef.afterClosed.and.returnValue(of(true));
    dialogRef.close.and.returnValue(null);

    dialog.open.and.returnValue(dialogRef);

    // Restablecer los espías antes de cada prueba
    productService.postProducts.calls.reset();
    dialog.open.calls.reset();

    component = new AdminProductsComponent(productService, dialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a product', () => {
    productService.deleteProduct.and.returnValue(of({}));

    component.deleteProduct(mockProductData);

    expect(productService.deleteProduct).toHaveBeenCalledWith(mockProductData.id.toString());
    expect(component.dataSource.data.length).toBe(0);
  });

  /*it('should call postProducts when adding a new product', fakeAsync(() => {
    const newProduct: productData = {
      id: 2,
      name: 'New Product',
      price: 20,
      image: 'new_product.jpg',
      type: 'Type B',
      dateEntry: '2023-10-28 15:14:20',
    };
  
    productService.postProducts.and.returnValue(of(newProduct));
  
    component.openAddProductModal();
  
    tick();
  
    // Verifica que se llame con el objeto newProduct
    expect(productService.postProducts).toHaveBeenCalledWith(newProduct);
    expect(component.dataSource.data).toContain(newProduct);
  });
  */
});
