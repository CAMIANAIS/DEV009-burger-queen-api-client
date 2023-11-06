import { Component,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { productData } from 'src/app/shared/interfaces/productData.interface';
import { ProductService } from 'src/app/services/product.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditModalComponent } from './product-edit-modal/product-edit-modal.component';
import { ProductCreateModalComponent } from './product-create-modal/product-create-modal.component';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  columnas: string[] = ['id', 'name', 'price', 'type', 'dateEntry', 'actions'];
  dataSource: MatTableDataSource<productData> = new MatTableDataSource<productData>([]); 

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private dialog:MatDialog) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }
  deleteProduct(producto: any) {
    this.productService.deleteProduct(producto.id).subscribe(() => {
      // Eliminar el producto de la fuente de datos de la tabla
      const index = this.dataSource.data.indexOf(producto);
      if (index >= 0) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
      console.log('Producto eliminado');
    });
  }
  openModaltoEditProduct(producto: productData) {
    const dialogRef = this.dialog.open(ProductEditModalComponent, {
      width: '400px', // Define el ancho del modal
      data: { updatedProduct: { ...producto } }, // Pasa los datos actualizados al modal
    });
    if (dialogRef) {
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Los cambios se guardan en result, puedes llamar a patchProduct aquí
        const productId: string = producto.id.toString(); 
        this.productService.patchProduct(productId, result).subscribe(() => {
          console.log('Producto modificado con éxito');
          // Realiza cualquier otra lógica necesaria
        });
      }
    });
    }
  }

  openAddProductModal(): void {
    const dialogRef = this.dialog.open(ProductCreateModalComponent, {
      width: '400px',
    });
    if (dialogRef) {
    dialogRef.afterClosed().subscribe((newProduct: productData) => {
      if (newProduct) {
        // Llama a la función postProduct del servicio para agregar el nuevo producto
        this.productService.postProducts(newProduct).subscribe((response) => {
          // Realiza acciones adicionales si es necesario
          console.log('Producto agregado con éxito');
        });
      }
    });
    }
  }
  openDeleteConfirmationDialog(order: productData) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: order,
    });
    if (dialogRef) {
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteProduct(order);
      }
    });
  }
  }
}
