import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { productData } from 'src/app/shared/interfaces/productData.interface';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent {
  product: productData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { updatedProduct: productData },
    public dialogRef: MatDialogRef<ProductEditModalComponent>
  ) {
    this.product = { ...data.updatedProduct };
  }

  saveChanges() {
    // Aquí puedes implementar la lógica para guardar los cambios en el producto.
    // Puedes acceder a this.product para obtener los datos del producto editado.
    // Luego, cierra el modal cuando hayas terminado.
    this.dialogRef.close(this.product);
  }

  closeModal() {
    this.dialogRef.close();
  }

}
