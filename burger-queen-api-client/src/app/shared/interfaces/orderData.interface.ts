import { productData } from "./productData.interface";

export interface ordersData {
  id: number;
  userId: string;
  client: string;
  table: string;
  products: { qty: number; product: productData }[];
  status: string;
  dataEntry: string;
  timer: number;
}