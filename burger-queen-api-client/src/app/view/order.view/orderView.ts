import { Component } from '@angular/core';
import { ProductAdded } from 'src/app/shared/interfaces/productadded.interface';
import { productData } from 'src/app/shared/interfaces/productData.interface';
@Component({
  selector: 'app-order-view',
  templateUrl: './orderView.component.html',
  styleUrls: ['./orderView.component.css']
})
export class OrderViewComponent {
  
  orderedProducts: { product: productData, quantity: number, price: number }[] = [];

  onProductAdded(productAdded: ProductAdded) {
    console.log('Product added in container component:', productAdded);
    this.orderedProducts.push(productAdded);
  }

}
