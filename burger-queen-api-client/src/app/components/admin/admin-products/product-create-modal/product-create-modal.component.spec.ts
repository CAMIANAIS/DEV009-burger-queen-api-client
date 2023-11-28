import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCreateModalComponent } from './product-create-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { productData } from 'src/app/shared/interfaces/productData.interface';
import { of } from 'rxjs';

// Simula un objeto DataService simple para las pruebas
const mockDataService = {
  getCurrentDateTimeFormatted: () => '2023-10-28 15:14:20',
};

describe('ProductCreateModalComponent', () => {
  let component: ProductCreateModalComponent;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ProductCreateModalComponent>>;
  let productService: jasmine.SpyObj<ProductService>;
  const mockProductData: productData = {
    id: 1,
    name: 'New Product',
    price: 20,
    image: 'new_product.jpg',
    type: 'Type B',
    dateEntry: '2023-10-28 15:14:20',
  };

  beforeEach(() => {
    const fb: FormBuilder = new FormBuilder();
    const productForm: FormGroup = fb.group({
      id: [''],
      name: ['', Validators.required],
      price: [0, Validators.required],
      image: [''],
      type: ['all'],
      dateEntry: ['2023-10-28 15:14:20', Validators.required],
    });

    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    productService = jasmine.createSpyObj('ProductService', ['postProducts']);

    component = new ProductCreateModalComponent(dialogRef, fb, productService, mockDataService);
    component.productForm = productForm;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal', () => {
    component.closeModal();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should add a product', () => {
    const newProduct: productData = {
      id: 2,
      name: 'New Product',
      price: 20,
      image: 'new_product.jpg',
      type: 'Type B',
      dateEntry: '2023-10-28 15:14:20',
    };
  
    // Configura el servicio para que devuelva un observable con el nuevo producto
    productService.postProducts.and.returnValue(of(newProduct));
  
    // Llama al método addProduct
    component.addProduct();
  
    // Debería haberse llamado a close del MatDialogRef con el nuevo producto
    expect(dialogRef.close).toHaveBeenCalledWith(newProduct);
  });
  
  it('should close the modal without adding a product if the form is invalid', () => {
    // Configura el formulario como inválido
    component.productForm.controls['name'].setValue('');

  
    // Llama al método addProduct
    component.addProduct();
  
    // close del MatDialogRef no debería haberse llamado
    expect(dialogRef.close).not.toHaveBeenCalled();
  
  });
});
