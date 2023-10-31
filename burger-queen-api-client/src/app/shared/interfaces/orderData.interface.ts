import { productData } from "./productData.interface";

export interface ordersData {
  id: number;
  userId: number;
  client: string;
  products: { qty: number; product: productData}[];
  status: string;
  dataEntry: string;
  dateProcessed?: string; 
}
