import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProductsComponent } from './admin-products.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { of } from 'rxjs';
import { productData } from 'src/app/shared/interfaces/productData.interface';

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let productService: jasmine.SpyObj<ProductService>;
  let dialog: jasmine.SpyObj<MatDialog>;

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

  beforeEach(() => {
    productService = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct', 'patchProduct', 'postProducts']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    component = new AdminProductsComponent(productService, dialog);
    console.log('productService spy:', productService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on ngOnInit', () => {
    productService.getProducts.and.returnValue(of(mockProductData));

    component.ngOnInit();

    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockProductData);
  });

  /*it('should delete a product', () => {
    productService.deleteProduct.and.returnValue(of({}));
    const productToDelete = mockProductData[0]; // Accede al primer elemento del arreglo
    
    component.deleteProduct(productToDelete);
  
    // Convierte el id del producto a número para la expectativa
    const expectedProductId = Number(productToDelete.id);
  
    expect(productService.deleteProduct).toHaveBeenCalledWith(expectedProductId.toString());
    expect(component.dataSource.data).not.toContain(productToDelete);
  });*/
  
  /*it('should patch a product', () => {
    const productToUpdate = mockProductData[0];
    const updatedProduct = { ...productToUpdate, name: 'Updated Product' };
    const productId = productToUpdate.id.toString();
    
    productService.patchProduct.and.returnValue(of(updatedProduct));
    
    component.openModaltoEditProduct(productToUpdate);
    
    // Espera que productService.patchProduct sea llamado con el producto actualizado
    expect(productService.patchProduct).toHaveBeenCalledWith(productId, updatedProduct);
    
    // Simula el resultado de la actualización
    expect(component.dataSource.data).toContain(updatedProduct);
  
    // Verifica que la propiedad 'name' del producto actualizado se haya modificado
    if (component.dataSource.data[0]) {
      expect(component.dataSource.data[0].name).toEqual('Updated Product');
    } else {
      fail('The first item in dataSource.data is undefined');
    }
  });
  
  
  it('should post a new product', () => {
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
  
    // Espera que productService.postProducts sea llamado con el nuevo producto
    expect(productService.postProducts).toHaveBeenCalledWith(newProduct);
  
    // Simula el resultado de la adición
    expect(component.dataSource.data).toContain(newProduct);

  });*/
});

