/*import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductEditModalComponent } from './product-edit-modal.component';

describe('ProductEditModalComponent', () => {
  let component: ProductEditModalComponent;
  let fixture: ComponentFixture<ProductEditModalComponent>;
  let dialogRef: MatDialogRef<ProductEditModalComponent>;
  
  const dialogData = {
    updatedProduct: { name: 'Producto de prueba',  }
  };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductEditModalComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: dialogData,
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    });
  
    // Realiza la compilación del componente y crea la instancia.
    fixture = TestBed.createComponent(ProductEditModalComponent);
    component = fixture.componentInstance;
  });
  

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should copy data.updatedProduct to product property', () => {
    expect(component.product).toEqual(component.data.updatedProduct);
  });

  it('should close the dialog when saveChanges is called', () => {
    component.saveChanges();
    expect(dialogRef.close).toHaveBeenCalledWith(component.product);
  });

  it('should close the dialog when closeModal is called', () => {
    component.closeModal();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});*/
