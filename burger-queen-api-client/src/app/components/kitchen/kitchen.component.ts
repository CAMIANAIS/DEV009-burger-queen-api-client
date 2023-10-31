import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OrderService } from 'src/app/services/orders.service';
import { ordersData } from 'src/app/shared/interfaces/orderData.interface';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatOption } from '@angular/material/core';
import { calculateElapsedTime } from 'src/app/shared/utils/elapsedTime'; 


@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  displayedColumns: string[] = ['actions','status', 'client', 'products', 'timer']; 
  dataSource: MatTableDataSource<ordersData> = new MatTableDataSource<ordersData>([]); // Fuente de datos de la tabla
  orders: ordersData[] = [];


  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(private orderService: OrderService,private http: HttpClient) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe((data) => {
      this.dataSource.data = data; // Establece los datos en la fuente de datos de la tabla
      this.dataSource.sort = this.sort; // Configura la clasificación
    });

    
  }
  deleteOrder(order: ordersData) {
    this.orderService.deleteOrder(order.id).subscribe(() => {
      // Eliminar la orden de la fuente de datos de la tabla
      const index = this.dataSource.data.indexOf(order);
      if (index >= 0) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
      console.log('Orden eliminada');
    });
  }
  changeStatusOrder(order: ordersData) {
    // Check the current status of the order
    if (order.status === 'pending') {
      // Change the status to 'done' when it's currently 'pending'
      order.status = 'done';

      // Make an HTTP request to update the order status on the server
      this.orderService.updateOrderStatus(order.id, 'done').subscribe(() => {
        console.log('Order status updated on the server.');
      });
    }
  } 


  calculateElapsedTimeForOrder(order: ordersData): string {
    if (order.dataEntry && order.dateProcessed) {
      return calculateElapsedTime(order.dataEntry, order.dateProcessed);
    }
  
    return ''; 
  }
}
