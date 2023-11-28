import { productData } from "./productData.interface";

export interface ProductAdded {
  product: productData;
  quantity: number;
  price: number;
}
