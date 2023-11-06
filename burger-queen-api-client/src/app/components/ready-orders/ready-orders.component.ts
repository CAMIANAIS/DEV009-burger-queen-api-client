import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OrderService } from 'src/app/services/orders.service';
import { ordersData } from 'src/app/shared/interfaces/orderData.interface';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { calculateElapsedTime } from 'src/app/shared/utils/elapsedTime';
import { Router } from '@angular/router';
@Component({
  selector: 'ready-orders',
  templateUrl: './ready-orders.component.html',
  styleUrls: ['./ready-orders.component.css']
})
export class ReadyOrdersComponent implements OnInit {
  displayedColumns: string[] = [ 'status', 'client', 'products', ];
  dataSource: MatTableDataSource<ordersData> = new MatTableDataSource<ordersData>([]); // Fuente de datos de la tabla
  orders: ordersData[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService, private http: HttpClient, private dialog: MatDialog, private router: Router,) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe((data) => {
      // Filtra las órdenes para mostrar solo las que tienen estado 'done' o 'delivered'
      const filteredOrders = data.filter(order => order.status === 'done' || order.status === 'delivered');
  
      this.dataSource.data = filteredOrders; // Establece los datos filtrados en la fuente de datos de la tabla
      this.dataSource.sort = this.sort; // Configura la clasificación
    });
  }
  
  changeStatusOrderWaiter(order: ordersData) {
    // Check the current status of the order
    if (order.status === 'done') {
      // Change the status to 'done' when it's currently 'pending'
      order.status = 'delivered';

      // Make an HTTP request to update the order status on the server
      this.orderService.updateOrderStatus(order.id, 'delivered').subscribe(() => {
        console.log('Order status updated on the server.');
      });
    }
  } 
  navigateToOrdersView() {
    this.router.navigate(['/orders']);
  }
}