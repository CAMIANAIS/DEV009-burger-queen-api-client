import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { productData } from 'src/app/shared/interfaces/productData.interface';
import { FormControl } from '@angular/forms';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-product-create-modal',
  templateUrl: './product-create-modal.component.html',
  styleUrls: ['./product-create-modal.component.css']
})
export class ProductCreateModalComponent {
  productForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ProductCreateModalComponent>,
    private fb: FormBuilder,
    private productService: ProductService,
    private dataService: DataService
  ) 
  {
    const currentDateTime = this.dataService.getCurrentDateTimeFormatted();
    this.productForm = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      price: [0, Validators.required],
      image: [''],
      type: ['all'],
      dateEntry: [currentDateTime, Validators.required],
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const newProductData: productData = this.productForm.value;
      this.dialogRef.close(newProductData); // Cierra el modal y pasa los datos del nuevo producto
      console.log(newProductData)
    }
  }
}
